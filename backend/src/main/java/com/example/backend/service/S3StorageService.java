package com.example.backend.service;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.awt.*;
import java.awt.geom.Rectangle2D;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import javax.imageio.ImageIO;


public interface S3StorageService {

    String uploadFile(String filename, MultipartFile multipartFile) throws IOException;

    void deleteFile(String filename) throws MalformedURLException;

    void deleteFiles(List<String> filenames) throws MalformedURLException;

    InputStream downloadFile(String filename);

    String uploadFileWaterMark(String filename, MultipartFile multipartFile) throws IOException;

}

@Service
class S3StorageServiceImpl implements S3StorageService {

    @Value("${cloud.aws.s3.bucket-name}")
    private String bucketName;

    @Autowired
    private S3Client s3Client;

    private InputStream addWatermark(MultipartFile file) throws IOException {
        String watermarkText = "Artwork sharing\nnot free\nContact for license"; // Example multi-line watermark
        String[] lines = watermarkText.split("\n"); // Splitting the watermark text into lines

        BufferedImage originalImage = ImageIO.read(file.getInputStream());
        int width = originalImage.getWidth();
        int height = originalImage.getHeight();

        BufferedImage watermarkedImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
        Graphics2D w = (Graphics2D) watermarkedImage.getGraphics();
        try {
            w.drawImage(originalImage, 0, 0, null);
            AlphaComposite alphaChannel = AlphaComposite.getInstance(AlphaComposite.SRC_OVER, 0.3f);
            w.setComposite(alphaChannel);
            w.setColor(Color.PINK);
            w.setFont(new Font(Font.SANS_SERIF, Font.BOLD, 64));
            FontMetrics fontMetrics = w.getFontMetrics();

            // Calculate the total height of all lines
            int totalHeight = (fontMetrics.getHeight() * lines.length) + (lines.length - 1) * 5; // Adjust line spacing if necessary

            // Initial Y position so that all lines are centered as a block
            int startY = (height - totalHeight) / 2;

            for (String line : lines) {
                Rectangle2D rect = fontMetrics.getStringBounds(line, w);
                int centerX = (width - (int) rect.getWidth()) / 2;
                int centerY = startY + fontMetrics.getAscent(); // Move down to baseline for each line

                w.drawString(line, centerX, centerY);
                startY += fontMetrics.getHeight() + 5; // Move to the next line, adjust spacing as needed
            }
        } finally {
            w.dispose(); // Ensure graphics resources are freed
        }

        ByteArrayOutputStream os = new ByteArrayOutputStream();
        ImageIO.write(watermarkedImage, "png", os);
        byte[] byteArray = os.toByteArray();

        InputStream is = new ByteArrayInputStream(byteArray);
        return is;
    }








    @Override
    public String uploadFile(String filename, MultipartFile multipartFile) throws IOException, S3Exception {
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(filename)
                .build();

        InputStream inputStream = multipartFile.getInputStream();
        s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(inputStream, multipartFile.getSize()));

        GetUrlRequest request = GetUrlRequest.builder()
                .bucket(bucketName)
                .key(filename)
                .build();

        URL url = s3Client.utilities().getUrl(request);

        return url.toString();
    }

    @Override
    public void deleteFile(String filename) throws S3Exception, MalformedURLException {
        URL url = new URL(filename);

        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(url.getPath().substring(1))
                .build();

        s3Client.deleteObject(deleteObjectRequest);
    }

    @Override
    public void deleteFiles(List<String> filenames) throws S3Exception, MalformedURLException {
        ArrayList<ObjectIdentifier> toDelete = new ArrayList<>();

        for (String objKey : filenames) {
            URL url = new URL(objKey);
            toDelete.add(ObjectIdentifier.builder()
                    .key(url.getPath().substring(1))
                    .build());
        }

        DeleteObjectsRequest deleteObjectRequest = DeleteObjectsRequest.builder()
                .bucket(bucketName)
                .delete(Delete.builder().objects(toDelete).build())
                .build();

        s3Client.deleteObjects(deleteObjectRequest);
    }

    @Override
    public InputStream downloadFile(String filename) throws S3Exception {
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(filename)
                .build();

        return s3Client.getObject(getObjectRequest);
    }

    @Override
    public String uploadFileWaterMark(String filename, MultipartFile multipartFile) throws IOException {
        // Tạo request để upload file lên S3
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(filename)
                .build();

        // Gọi phương thức addWatermark để thêm watermark vào ảnh và lấy lại dưới dạng InputStream
        InputStream inputStreamWithWatermark = addWatermark(multipartFile);

        // Chuyển đổi InputStream sang mảng byte
        byte[] imageBytesWithWatermark = IOUtils.toByteArray(inputStreamWithWatermark);

        // Upload ảnh đã thêm watermark lên S3 với kích thước chính xác
        s3Client.putObject(putObjectRequest, RequestBody.fromBytes(imageBytesWithWatermark));

        // Tạo request để lấy URL của file vừa upload lên S3
        GetUrlRequest request = GetUrlRequest.builder()
                .bucket(bucketName)
                .key(filename)
                .build();

        // Lấy và trả về URL của file
        URL url = s3Client.utilities().getUrl(request);
        return url.toString();
    }

}

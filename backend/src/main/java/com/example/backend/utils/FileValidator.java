package com.example.backend.utils;

import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class FileValidator {

    private static final Set<String> VALID_EXTENSIONS = new HashSet<>(Arrays.asList("jpg", "jpeg", "png"));

    public static boolean isValidImageFile(MultipartFile file) {
        if (file == null || file.isEmpty() || file.getOriginalFilename() == null) {
            return false;
        }

        String originalFilename = file.getOriginalFilename();
        String extension = extractFileExtension(originalFilename);

        if (!isValidExtension(extension)) {
            return false;
        }

        return isValidImageContent(file);
    }

    public static String getCustomFileName(MultipartFile file, String key) {
        String originalFilename = file.getOriginalFilename();
        String extension = extractFileExtension(Objects.requireNonNull(originalFilename, "File name is null"));
        return System.currentTimeMillis() + "_" + key + "." + extension;
    }

    public static String getCustomFileName(MultipartFile file) {
        String originalFilename = file.getOriginalFilename();
        String extension = extractFileExtension(Objects.requireNonNull(originalFilename, "File name is null"));

        if (originalFilename.length() > 150)
            return System.currentTimeMillis() + "_" + originalFilename.substring(0, 150) + "." + extension;
        else
            return System.currentTimeMillis() + "_" + originalFilename;
    }

    private static String extractFileExtension(String filename) {
        int dotIndex = filename.lastIndexOf(".");
        return (dotIndex == -1) ? "" : filename.substring(dotIndex + 1).toLowerCase();
    }

    private static boolean isValidExtension(String extension) {
        return VALID_EXTENSIONS.contains(extension);
    }

    private static boolean isValidImageContent(MultipartFile file) {
        try {
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image")) {
                return false;
            }

            return ImageIO.read(file.getInputStream()) != null;
        } catch (IOException e) {
            return false;
        }
    }
}

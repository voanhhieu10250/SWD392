package com.example.backend.service;


import com.example.backend.dto.PostLikeDTO;
import com.example.backend.entity.PostLike;
import com.example.backend.repository.PostLikeRepository;
import jakarta.persistence.NoResultException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

public interface PostLikeService {

    void create(PostLikeDTO postLikeDTO);
    PostLikeDTO getById(int id);
    void update(PostLikeDTO premiumDownloadDTO);
    void delete(int id);
    List<PostLikeDTO> getAll();
//    PageDTO<CategoryDTO> search(SearchDTO searchDTO);
}

@Service
class PostLikeServiceImpl implements PostLikeService {

    @Autowired
    private PostLikeRepository postLikeRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    @Transactional
    public void create(PostLikeDTO postLikeDTO) {
        PostLike postLike = modelMapper.map(postLikeDTO, PostLike.class);
        postLikeRepository.save(postLike);
    }

    @Override
    public PostLikeDTO getById(int id) {
        PostLike postLike = postLikeRepository.findById(id).orElseThrow(NoResultException::new);
        return modelMapper.map(postLike, PostLikeDTO.class);
    }

    @Override
    @Transactional
    public void update(PostLikeDTO postLikeDTO) {
        postLikeRepository.findById(postLikeDTO.getId()).orElseThrow(NoResultException::new);
        postLikeRepository.save(modelMapper.map(postLikeDTO, PostLike.class));
    }

    @Override
    @Transactional
    public void delete(int id) {
        postLikeRepository.findById(id).orElseThrow(NoResultException::new);
        postLikeRepository.deleteById(id);
    }

    @Override
    public List<PostLikeDTO> getAll() {
        List<PostLike> lists = postLikeRepository.findAll();
        return lists.stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    private PostLikeDTO convert(PostLike premiumDownload) {
        return modelMapper.map(premiumDownload, PostLikeDTO.class);
    }
}

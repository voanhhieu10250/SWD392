package com.example.backend.service;


import com.example.backend.dto.CommentLikeDTO;
import com.example.backend.entity.CommentLike;
import com.example.backend.repository.CommentLikeRepository;
import jakarta.persistence.NoResultException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

public interface CommentLikeService {

    void create(CommentLikeDTO commentLikeDTO);
    CommentLikeDTO getById(int id);
    void update(CommentLikeDTO premiumDownloadDTO);
    void delete(int id);
    List<CommentLikeDTO> getAll();
//    PageDTO<CategoryDTO> search(SearchDTO searchDTO);
}

@Service
class CommentLikeServiceImpl implements CommentLikeService {

    @Autowired
    private CommentLikeRepository commentLikeRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    @Transactional
    public void create(CommentLikeDTO commentLikeDTO) {
        CommentLike commentLike = modelMapper.map(commentLikeDTO, CommentLike.class);
        commentLikeRepository.save(commentLike);
    }

    @Override
    public CommentLikeDTO getById(int id) {
        CommentLike commentLike = commentLikeRepository.findById(id).orElseThrow(NoResultException::new);
        return modelMapper.map(commentLike, CommentLikeDTO.class);
    }

    @Override
    @Transactional
    public void update(CommentLikeDTO commentLikeDTO) {
        commentLikeRepository.findById(commentLikeDTO.getId()).orElseThrow(NoResultException::new);
        commentLikeRepository.save(modelMapper.map(commentLikeDTO, CommentLike.class));
    }

    @Override
    @Transactional
    public void delete(int id) {
        commentLikeRepository.findById(id).orElseThrow(NoResultException::new);
        commentLikeRepository.deleteById(id);
    }

    @Override
    public List<CommentLikeDTO> getAll() {
        List<CommentLike> lists = commentLikeRepository.findAll();
        return lists.stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    private CommentLikeDTO convert(CommentLike premiumDownload) {
        return modelMapper.map(premiumDownload, CommentLikeDTO.class);
    }
}

package com.example.backend.service;

import com.example.backend.dto.CommentDTO;
import com.example.backend.entity.Comment;
import com.example.backend.repository.CommentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

public interface CommentService {

    List<CommentDTO> getAllCommentByArt(int id);

    void create(CommentDTO commentDTO);

}

@Service
class CommentServiceImpl implements CommentService {

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    CommentRepository commentRepository;

    @Override
    public List<CommentDTO> getAllCommentByArt(int id) {
        List<Comment> comments = commentRepository.findCommentByArtId(id);
        return comments.stream()
                .map(this::convertToCommentDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void create(CommentDTO commentDTO) {
        commentRepository.save(modelMapper.map(commentDTO, Comment.class));
    }

    private CommentDTO convertToCommentDTO(Comment comment) {
        return modelMapper.map(comment, CommentDTO.class);
    }


}

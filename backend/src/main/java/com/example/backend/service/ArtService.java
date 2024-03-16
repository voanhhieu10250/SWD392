package com.example.backend.service;

import com.example.backend.dto.ArtDTO;
import com.example.backend.dto.ArtMetadata;
import com.example.backend.dto.PageDTO;
import com.example.backend.dto.SearchDTO;
import com.example.backend.entity.Art;
import com.example.backend.repository.ArtRepository;
import jakarta.persistence.NoResultException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.stream.Collectors;

public interface ArtService {

    void create(ArtDTO artDTO);

    ArtDTO getById(int id);

    void update(ArtDTO artDTO);

    void delete(int id);

    List<ArtDTO> getAll();

    PageDTO<ArtDTO> search(SearchDTO searchDTO);

    Page<ArtMetadata> search(String query, String searchBy, int page);

    Page<ArtMetadata> getRecent(int page);

    List<ArtMetadata> getTopWeek();
}

@Service
class ArtServiceImpl implements ArtService {

    @Autowired
    ModelMapper modelMapper;
    @Autowired
    private ArtRepository artRepository;

    @Override
    @Transactional
    public void create(ArtDTO artDTO) {
        Art product = modelMapper.map(artDTO, Art.class);
        artRepository.save(product);
    }

    @Override
    public ArtDTO getById(int id) {
        Art art = artRepository.findById(id).orElseThrow(NoResultException::new);
        return modelMapper.map(art, ArtDTO.class);
    }

    @Override
    @Transactional
    public void update(ArtDTO artDTO) {
        artRepository.findById(artDTO.getId()).orElseThrow(NoResultException::new);
        artRepository.save(modelMapper.map(artDTO, Art.class));
    }

    @Override
    @Transactional
    public void delete(int id) {
        artRepository.findById(id).orElseThrow(NoResultException::new);
        artRepository.deleteById(id);
    }

    @Override
    public List<ArtDTO> getAll() {
        List<Art> arts = artRepository.findAll();
        return arts.stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    @Override
    public PageDTO<ArtDTO> search(SearchDTO searchDTO) {
        Sort sortBy = Sort.by("title").ascending();

        if (StringUtils.hasText(searchDTO.getSortedField())) {
            sortBy = Sort.by(searchDTO.getSortedField()).ascending();
        }

        if (searchDTO.getCurrentPage() == null)
            searchDTO.setCurrentPage(0);

        if (searchDTO.getSize() == null)
            searchDTO.setSize(5);

        if (searchDTO.getKeyword() == null)
            searchDTO.setKeyword("");

        PageRequest pageRequest = PageRequest.of(searchDTO.getCurrentPage(), searchDTO.getSize(), sortBy);
        Page<Art> page = artRepository.searchByName("%" + searchDTO.getKeyword() + "%", pageRequest);
        return PageDTO.<ArtDTO>builder()
                .totalPages(page.getTotalPages())
                .totalElements(page.getTotalElements())
                .contents(page.get().map(this::convert).collect(Collectors.toList()))
                .build();
    }

    @Override
    public Page<ArtMetadata> search(String query, String searchBy, int page) {
        Pageable pageable = PageRequest.of(page - 1, 10, Sort.by("id").descending());

        if (searchBy == null || searchBy.isEmpty() || searchBy.equals("title"))
            return artRepository.findAllByTitleContainsIgnoreCase(query, pageable).map(ArtMetadata::new);
        else if (searchBy.equals("tags")){
            return artRepository.findAllByTagsContainsIgnoreCase(query, pageable).map(ArtMetadata::new);
        } else {
            return artRepository.findAllByDescriptionContainsIgnoreCase(query,  pageable).map(ArtMetadata::new);
        }
    }

    @Override
    public Page<ArtMetadata> getRecent(int page) {
        Pageable pageable = PageRequest.of(page - 1, 10, Sort.by("id").descending());

        return artRepository.findAll(pageable).map(ArtMetadata::new);
    }

    @Override
    public List<ArtMetadata> getTopWeek() {
        // get the first 10 arts
        return artRepository.findTopWeek().stream().map(ArtMetadata::new).collect(Collectors.toList());
    }

    private ArtDTO convert(Art art) {
        return modelMapper.map(art, ArtDTO.class);
    }
}

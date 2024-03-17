package com.example.backend.service;

import com.example.backend.dto.PackagePurchasedDTO;
import com.example.backend.entity.PackagePurchased;
import com.example.backend.entity.User;
import com.example.backend.repository.PackagePurchasedRepository;
import jakarta.persistence.NoResultException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public interface PackagePurchasedService {

    void create(int userId, PackagePurchasedDTO packagePurchasedDTO);

    PackagePurchasedDTO getById(int id);

    void update(PackagePurchasedDTO packagePurchasedDTO);

    void delete(int id);

    List<PackagePurchasedDTO> getAll();
//    PageDTO<CategoryDTO> search(SearchDTO searchDTO);
}

@Service
class PackagePurchasedServiceImpl implements PackagePurchasedService {

    @Autowired
    ModelMapper modelMapper;
    @Autowired
    private PackagePurchasedRepository packagePurchasedRepository;
    @Autowired
    private UserService userService;

    @Override
    @Transactional
    public void create(int userId, PackagePurchasedDTO dto) {
        User user = userService.findById(userId);

        if (dto.getPackageName().equals("Creator")) {
            user.setIsCreator(true);
        } else {
            user.setIsPremiumAudience(true);
        }
        PackagePurchased packagePurchased = modelMapper.map(dto, PackagePurchased.class);
        packagePurchased.setUser(user);
        packagePurchased.setDate(new Date());

        packagePurchasedRepository.save(packagePurchased);
    }

    @Override
    public PackagePurchasedDTO getById(int id) {
        PackagePurchased packagePurchased = packagePurchasedRepository.findById(id).orElseThrow(NoResultException::new);
        return modelMapper.map(packagePurchased, PackagePurchasedDTO.class);
    }

    @Override
    @Transactional
    public void update(PackagePurchasedDTO packagePurchasedDTO) {
        packagePurchasedRepository.findById(packagePurchasedDTO.getId()).orElseThrow(NoResultException::new);
        packagePurchasedRepository.save(modelMapper.map(packagePurchasedDTO, PackagePurchased.class));
    }

    @Override
    @Transactional
    public void delete(int id) {
        packagePurchasedRepository.findById(id).orElseThrow(NoResultException::new);
        packagePurchasedRepository.deleteById(id);
    }

    @Override
    public List<PackagePurchasedDTO> getAll() {
        List<PackagePurchased> lists = packagePurchasedRepository.findAll();
        return lists.stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    private PackagePurchasedDTO convert(PackagePurchased packagePurchased) {
        return modelMapper.map(packagePurchased, PackagePurchasedDTO.class);
    }
}

package com.bamos.tuto.service;

import com.bamos.tuto.model.Product;
import com.bamos.tuto.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    public Product getProductById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit avec l'ID " + id + " est introuvable"));
    }

    @Transactional
    public Product createProduct(String name, Double price) {
        Product p = new Product();
        p.setName(name);
        p.setPrice(price);
        return repository.save(p);
    }

    @Transactional
    public Product updateProduct(Long id, String name, Double price) {
        Product existing = getProductById(id);
        if (name != null) existing.setName(name);
        if (price != null) existing.setPrice(price);
        return repository.save(existing);
    }

    @Transactional
    public Boolean deleteProduct(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Impossible de supprimer : Produit inexistant");
        }
        repository.deleteById(id);
        return true;
    }
}
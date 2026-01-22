package com.bamos.tuto.controller.graphql;

import com.bamos.tuto.model.Product;
import com.bamos.tuto.repository.ProductRepository;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    private final ProductRepository repository;

    public ProductController(ProductRepository repository) {
        this.repository = repository;
    }

    // --- READ ---
    @QueryMapping
    public List<Product> findAllProducts() {
        return repository.findAll();
    }

    @QueryMapping
    public Product findProductById(@Argument Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Produit introuvable"));
    }

    // --- CREATE ---
    @MutationMapping
    public Product saveProduct(@Argument String name, @Argument Double price) {
        Product p = new Product();
        p.setName(name);
        p.setPrice(price);
        return repository.save(p);
    }

    // --- DELETE ---
    @MutationMapping
    public Boolean deleteProduct(@Argument Long id) {
        repository.deleteById(id);
        return true;
    }
}
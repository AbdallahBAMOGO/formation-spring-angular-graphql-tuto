package com.bamos.tuto.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/graphql") // Autorise l'accès à l'URL GraphQL
                        .allowedOrigins("http://localhost:4200") // L'URL de votre Angular
                        .allowedMethods("POST", "OPTIONS") // GraphQL utilise principalement POST
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
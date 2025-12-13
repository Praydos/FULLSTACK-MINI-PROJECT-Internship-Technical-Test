//package org.example.simplefullstackapp.config;
//
//// SpringBootAppApplication.java or a new WebConfig.java class
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class CorsConfig implements WebMvcConfigurer {
//
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/api/**") // Apply to all API endpoints
//                .allowedOrigins("http://localhost:3000", "http://localhost:3001") // ALLOW React Development Server
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH") // Allow all necessary methods
//                .allowedHeaders("*"); // Allow all headers
//    }
//}
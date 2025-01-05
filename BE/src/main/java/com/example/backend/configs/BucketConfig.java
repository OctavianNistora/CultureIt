package com.example.backend.configs;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BucketConfig {

    @Value("${s3.endpoint.url}")
    private String s3EndpointUrl;

    @Value("${s3.access.key}")
    private String s3AccessKey;

    @Value("${s3.secret.key}")
    private String s3SecretKey;

    @Bean
    public AmazonS3 getAmazonS3Client() {
    AWSCredentials credentails = new BasicAWSCredentials(s3AccessKey, s3SecretKey);
    return AmazonS3ClientBuilder.standard()
            .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(s3EndpointUrl, "auto"))
            .withCredentials(new AWSStaticCredentialsProvider(credentails))
            .build();
    }
}
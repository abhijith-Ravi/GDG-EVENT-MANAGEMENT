package com.gdg.nmit.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.http.HttpMethod;

import com.gdg.nmit.security.JwtAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {

        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(auth -> auth

                        // Public endpoints
                        .requestMatchers(
                                "/gdg/signup",
                                "/gdg/signin"
                        ).permitAll()

                        // Admin only
                        .requestMatchers(HttpMethod.POST, "/api/events")
                        .hasRole("ADMIN")

                        .requestMatchers(HttpMethod.PUT, "/api/events")
                        .hasRole("ADMIN")

                        .requestMatchers(HttpMethod.DELETE, "/api/events/**")
                        .hasRole("ADMIN")

                        // Student and Admin
                        .requestMatchers(HttpMethod.GET, "/api/**")
                        .hasAnyRole("ADMIN", "STUDENT")

                        // Student only
                        .requestMatchers("/gdg/EventRegister")
                        .hasAnyRole("STUDENT","ADMIN")

                        .anyRequest()
                        .authenticated()
                )

                .httpBasic(Customizer.withDefaults());

        http.addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
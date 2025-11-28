package ProjetoMuseu.Crud.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ProjetoMuseu.Crud.DTO.LoginRequest;
import ProjetoMuseu.Crud.DTO.TokenValidationRequest;
import ProjetoMuseu.Crud.DTO.TokenValidationResponse;
import ProjetoMuseu.Crud.security.JwtUtil;
import ProjetoMuseu.Crud.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthController(AuthService authService, AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authService = authService;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    logger.info("Tentativa de login JWT para: {}", loginRequest.getEmail());
    
    try {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getSenha())
        );
        
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtUtil.generateToken(userDetails);
        String role = authService.getRoleFromDatabase(loginRequest.getEmail());
        
        logger.info("LOGIN JWT SUCESSO - Usuário: {}, Role: {}", loginRequest.getEmail(), role);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login realizado com sucesso");
        response.put("token", token);
        response.put("role", role);
        response.put("usuario", loginRequest.getEmail());
        response.put("authenticated", true);
        
        return ResponseEntity.ok(response);
        
    } catch (Exception e) {
        logger.error("ERRO no login para {}: {}", loginRequest.getEmail(), e.getMessage());
        
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("message", "Credenciais inválidas!");
        errorResponse.put("authenticated", false);
        errorResponse.put("error", e.getMessage());
        
        return ResponseEntity.status(401).body(errorResponse);
    }
}

@PostMapping("/validate")
public ResponseEntity<TokenValidationResponse> validateToken(@RequestBody TokenValidationRequest request) {
    String token = request.getToken();
    System.out.println("Validando token: " + token.substring(0, 20) + "...");
    
    if (jwtUtil.validateToken(token)) {
        String username = jwtUtil.extractUsername(token);
        String role = authService.getRoleFromDatabase(username);
        
        System.out.println("Token VÁLIDO para: " + username + " - Role: " + role);
        
        return ResponseEntity.ok(TokenValidationResponse.valid(username, role));
    }
    
    System.out.println("Token INVÁLIDO");
    return ResponseEntity.ok(TokenValidationResponse.invalid());
}
}

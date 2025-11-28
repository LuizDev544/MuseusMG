package ProjetoMuseu.Crud.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import ProjetoMuseu.Crud.entity.Admin;
import ProjetoMuseu.Crud.repository.AdminRepository;

@Service
public class AuthService {

    private final AdminRepository adminRepository; 
    private final PasswordEncoder passwordEncoder;

    public AuthService(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean autenticar(String email, String senha) {
        Admin adminEncontrado = adminRepository.findByEmail(email);
        
        if (adminEncontrado != null) {
            boolean senhaCorreta = passwordEncoder.matches(senha, adminEncontrado.getSenha());
            System.out.println("Autenticação - Email: " + email + ", Sucesso: " + senhaCorreta);
            return senhaCorreta;
        }
        
        System.out.println("Admin NÃO encontrado: " + email);
        return false;
    }

    public String getRoleFromDatabase(String email) {
        Admin admin = adminRepository.findByEmail(email);
        if (admin != null) {
            return admin.getRole();
        }
        return null;
    }

    public boolean isAdmin(String email) {
        String role = getRoleFromDatabase(email);
        return "ROLE_ADMIN".equals(role);
    }
}
package backend.controller;

import backend.dao.VilaoDAO;
import backend.model.Vilao;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5174")
public class VilaoController {

    private VilaoDAO dao = new VilaoDAO();

    @GetMapping("/api/viloes")
    public List<Vilao> getViloes() {
        return dao.getAllViloes();
    }
}
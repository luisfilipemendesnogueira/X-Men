package backend.controller;

import backend.dao.LocalDAO;
import backend.model.Local;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5174") // libera o React
public class LocalController {

    private LocalDAO localDAO = new LocalDAO();

    @GetMapping("/api/locais")
    public List<Local> getLocais() {
        return localDAO.getAllLocais();
    }
}

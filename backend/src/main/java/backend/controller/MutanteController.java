package backend.controller;

import backend.MySQLConnection;
import backend.dao.MutanteDAO;
import backend.model.Mutante;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5174") // libera o React no localhost:5174
public class MutanteController {

    private MutanteDAO mutanteDAO = new MutanteDAO();

    @GetMapping("/api/mutantes")
    public List<Mutante> getMutantes() {
        return mutanteDAO.getAllMutantes();
    }
    
    @PostMapping("/api/mutantes")
    public String addMutante(
            @RequestParam("alterEgo") String alterEgo,
            @RequestParam("nome") String nome,
            @RequestParam("sobrenome") String sobrenome,
            @RequestParam(value = "imagem", required = false) MultipartFile imagem,
    		@RequestParam("tipo") String tipo) {

        // Validação dos campos obrigatórios
        if (alterEgo == null || alterEgo.trim().isEmpty()) {
            return "Erro: 'Alter Ego' é obrigatório!";
        }
        if (nome == null || nome.trim().isEmpty()) {
            return "Erro: 'Nome' é obrigatório!";
        }
        
        if (tipo == null || (!tipo.equalsIgnoreCase("heroi") && !tipo.equalsIgnoreCase("vilao"))) {
            return "Erro: Escolha um 'Tipo'!";
        }

        // Caminho absoluto baseado na raiz do projeto
        String projectDir = System.getProperty("user.dir");
        String uploadDir = projectDir + "/uploads/images/personagens/";
        File dir = new File(uploadDir);
        if (!dir.exists()) dir.mkdirs();
        
        String fileName = "sem-imagem.png"; // padrão se não enviar

        try {
            if (imagem != null && !imagem.isEmpty()) {
                fileName = imagem.getOriginalFilename();

                // Evitar sobrescrever arquivos: adiciona (1), (2), ...
                File file = new File(uploadDir + fileName);
                int count = 1;
                String nameOnly = fileName.substring(0, fileName.lastIndexOf('.'));
                String extension = fileName.substring(fileName.lastIndexOf('.'));
                while (file.exists()) {
                    fileName = nameOnly + "(" + count + ")" + extension;
                    file = new File(uploadDir + fileName);
                    count++;
                }

                // Salva a imagem
                imagem.transferTo(file);
            }

            // Chama DAO para salvar no banco
            MutanteDAO dao = new MutanteDAO();
            dao.insertMutante(alterEgo, nome, sobrenome, fileName, tipo);

            return "Mutante registrado com sucesso!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Erro ao registrar mutante: " + e.getMessage();
        }
    }
    
    @GetMapping("/api/herois/top")
    public List<Map<String, Object>> topHerois() {
        List<Map<String, Object>> topHerois = new ArrayList<>();

        String sql = """
            SELECT 
                mu.id_mutante,
                mu.alter_ego,
                mu.nome,
                mu.sobrenome,
                mu.imagem,
                COUNT(mh.id_missao) AS contador_missoes,
                COALESCE(ROUND(AVG(m.dificuldade), 1), 0) AS dificuldade_media,
                COALESCE(SUM(m.dificuldade), 0) AS pontuacao_total
            FROM mutantes mu
            JOIN missao_herois mh ON mu.id_mutante = mh.id_heroi
            JOIN missao m ON m.id_missao = mh.id_missao
            WHERE mu.tipo = 'heroi'
            GROUP BY mu.id_mutante, mu.alter_ego, mu.nome, mu.sobrenome, mu.imagem
            HAVING contador_missoes > 0
            ORDER BY pontuacao_total DESC, dificuldade_media DESC, id_mutante ASC
            LIMIT 3;
        """;

        try (Connection conn = MySQLConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Map<String, Object> heroi = Map.of(
                    "idMutante", rs.getInt("id_mutante"),
                    "alterEgo", rs.getString("alter_ego"),
                    "nome", rs.getString("nome"),
                    "sobrenome", rs.getString("sobrenome"),
                    "imagem", rs.getString("imagem"),
                    "contador_missoes", rs.getInt("contador_missoes"),
                    "dificuldadeMedia", rs.getDouble("dificuldade_media"),
                    "pontuacaoTotal", rs.getInt("pontuacao_total")
                );
                topHerois.add(heroi);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return topHerois;
    }
}


package backend.controller;

import backend.MySQLConnection;
import org.springframework.web.bind.annotation.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Map;
import java.sql.ResultSet;
import java.util.ArrayList;


@RestController
@CrossOrigin(origins = "http://localhost:5174")
public class MissaoController {

	@PostMapping("/api/missoes")
	public String cadastrarMissao(@RequestBody Map<String, Object> payload) {
	    try (Connection conn = MySQLConnection.getConnection()) {
	        conn.setAutoCommit(false);

	        int idVilao = Integer.parseInt(payload.get("idVilao").toString());
	        int idLocal = Integer.parseInt(payload.get("idLocal").toString());

	        List<Integer> idHerois = ((List<?>) payload.get("idHerois"))
	                .stream()
	                .map(Object::toString)
	                .map(Integer::parseInt)
	                .toList();
	        
	        int dificuldade = Integer.parseInt(payload.get("dificuldade").toString());

	        // Inserir missão
	        String sqlMissao = "INSERT INTO missao (id_vilao, id_local, dificuldade) VALUES (?, ?, ?)";
	        PreparedStatement psMissao = conn.prepareStatement(sqlMissao, Statement.RETURN_GENERATED_KEYS);
	        psMissao.setInt(1, idVilao);
	        psMissao.setInt(2, idLocal);
	        psMissao.setInt(3, dificuldade);
	        psMissao.executeUpdate();

	        var rs = psMissao.getGeneratedKeys();
	        rs.next();
	        int idMissao = rs.getInt(1);

	        // Inserir heróis na missão
	        String sqlHeroi = "INSERT INTO missao_herois (id_missao, id_heroi) VALUES (?, ?)";
	        PreparedStatement psHeroi = conn.prepareStatement(sqlHeroi);
	        for (int idHeroi : idHerois) {
	            psHeroi.setInt(1, idMissao);
	            psHeroi.setInt(2, idHeroi);
	            psHeroi.addBatch();
	        }
	        psHeroi.executeBatch();

	        // Atualizar contador e pontuação total para cada herói
	        String sqlUpdate = "UPDATE mutantes SET contador_missoes = contador_missoes + 1, pontuacao_total = pontuacao_total + ? WHERE id_mutante = ?";
	        PreparedStatement psUpdate = conn.prepareStatement(sqlUpdate);
	        for (int idHeroi : idHerois) {
	        	psUpdate.setInt(1, dificuldade);
	            psUpdate.setInt(2, idHeroi);
	            psUpdate.addBatch();
	        }
	        psUpdate.executeBatch();

	        conn.commit();
	        return "Missão cadastrada com sucesso!";

	    } catch (Exception e) {
	        e.printStackTrace();
	        return "Erro ao cadastrar missão: " + e.getMessage();
	    }
	}

    
    @GetMapping("/api/missoes")
    public List<Map<String, Object>> listarMissoes() {
        List<Map<String, Object>> lista = new ArrayList<>();

        String sql = """
            SELECT m.id_missao, 
                   v.alter_ego AS vilaoAlter, v.nome AS vilaoNome, v.sobrenome AS vilaoSobrenome, v.imagem AS vilaoImg,
                   l.nome_local AS localNome, l.imagem AS localImg
            FROM missao m
            JOIN viloes v ON v.id_vilao = m.id_vilao
            JOIN locais l ON l.id_local = m.id_local
            ORDER BY m.id_missao DESC;
        """;

        try (Connection conn = MySQLConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                int idMissao = rs.getInt("id_missao");

                // Buscar os heróis dessa missão
                PreparedStatement psHerois = conn.prepareStatement("""
                    SELECT mutantes.alter_ego
                    FROM missao_herois
                    JOIN mutantes ON mutantes.id_mutante = missao_herois.id_heroi
                    WHERE missao_herois.id_missao = ?
                """);
                psHerois.setInt(1, idMissao);
                ResultSet rsH = psHerois.executeQuery();

                List<String> herois = new ArrayList<>();
                while (rsH.next()) {
                    herois.add(rsH.getString("alter_ego"));
                }

                Map<String, Object> missao = Map.of(
                    "vilaoAlter", rs.getString("vilaoAlter"),
                    "vilaoNome", rs.getString("vilaoNome"),
                    "vilaoSobrenome", rs.getString("vilaoSobrenome"),
                    "vilaoImg", rs.getString("vilaoImg"),
                    "localNome", rs.getString("localNome"),
                    "localImg", rs.getString("localImg"),
                    "herois", herois
                );
                lista.add(missao);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return lista;
    }

}

package backend.dao;

import backend.MySQLConnection;
import backend.model.Missao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;

public class MissaoDAO {

    public int criarMissao(int idVilao, int idLocal, List<Integer> idHerois, int dificuldade) throws Exception {
        int idMissao = 0;
        String sqlMissao = "INSERT INTO missao (id_vilao, id_local, dificuldade) VALUES (?, ?, ?)";

        try (Connection conn = MySQLConnection.getConnection()) {
            conn.setAutoCommit(false);

            // Inserir missão
            try (PreparedStatement ps = conn.prepareStatement(sqlMissao, PreparedStatement.RETURN_GENERATED_KEYS)) {
                ps.setInt(1, idVilao);
                ps.setInt(2, idLocal);
                ps.setInt(3, dificuldade);
                ps.executeUpdate();

                ResultSet rs = ps.getGeneratedKeys();
                if (rs.next()) idMissao = rs.getInt(1);
            }

            // Inserir heróis da missão
            String sqlHerois = "INSERT INTO missao_herois (id_missao, id_heroi) VALUES (?, ?)";
            try (PreparedStatement ps = conn.prepareStatement(sqlHerois)) {
                for (int idHeroi : idHerois) {
                    ps.setInt(1, idMissao);
                    ps.setInt(2, idHeroi);
                    ps.addBatch();
                }
                ps.executeBatch();
            }
            
            // Incrementa o contador de cada herói selecionado
            String sqlIncrement = "UPDATE mutantes SET contador_missoes = contador_missoes + 1 WHERE id_mutante = ?";
            try (PreparedStatement ps = conn.prepareStatement(sqlIncrement)) {
                for (int idHeroi : idHerois) {
                    ps.setInt(1, idHeroi);
                    ps.addBatch();
                }
                ps.executeBatch();
            }
            conn.commit();
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }

        return idMissao;
    }

    // Opcional: listar missões com vilão, local e heróis
}

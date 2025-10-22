package backend.dao;

import backend.model.Mutante;
import backend.MySQLConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class MutanteDAO {

    public List<Mutante> getAllMutantes() {
        List<Mutante> mutantes = new ArrayList<>();
        String sql = "SELECT * FROM mutantes";

        try (Connection conn = MySQLConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Mutante m = new Mutante(
                        rs.getInt("id_mutante"),
                        rs.getString("alter_ego"),
                        rs.getString("nome"),
                        rs.getString("sobrenome"),
                        rs.getString("link"),
                        rs.getString("imagem"),
                        rs.getString("tipo")
                );
                mutantes.add(m);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return mutantes;
    }

    public void insertMutante(String alterEgo, String nome, String sobrenome, String imagem, String tipo) {
        String sql = "INSERT INTO mutantes (alter_ego, nome, sobrenome, link, imagem) VALUES (?, ?, ?, '', ?, ?)";

        try (Connection conn = MySQLConnection.getConnection(); 
        PreparedStatement psMutante = conn.prepareStatement(sql)) {
            psMutante.setString(1, alterEgo);
            psMutante.setString(2, nome);
            psMutante.setString(3, sobrenome);
            psMutante.setString(4, imagem);
            psMutante.setString(5, tipo);
            psMutante.executeUpdate();

            if (tipo != null && tipo.equalsIgnoreCase("vilao")) {
                String sqlVilao = "INSERT INTO viloes (alter_ego, nome, sobrenome, imagem) VALUES (?, ?, ?, ?)";
                try (PreparedStatement psVilao = conn.prepareStatement(sqlVilao)) {
                    psVilao.setString(1, alterEgo);
                    psVilao.setString(2, nome);
                    psVilao.setString(3, sobrenome);
                    psVilao.setString(4, imagem);
                    psVilao.executeUpdate();
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}


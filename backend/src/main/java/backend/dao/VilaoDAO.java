package backend.dao;

import backend.model.Vilao;
import backend.MySQLConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class VilaoDAO {

    public List<Vilao> getAllViloes() {
        List<Vilao> viloes = new ArrayList<>();
        String sql = "SELECT * FROM viloes";

        try (Connection conn = MySQLConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Vilao v = new Vilao(
                        rs.getInt("id_vilao"),
                        rs.getString("alter_ego"),
                        rs.getString("nome"),
                        rs.getString("sobrenome"),
                        rs.getString("imagem")
                );
                viloes.add(v);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return viloes;
    }
}

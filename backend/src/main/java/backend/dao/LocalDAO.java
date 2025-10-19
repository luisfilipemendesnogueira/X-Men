package backend.dao;

import backend.MySQLConnection;
import backend.model.Local;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class LocalDAO {

    public List<Local> getAllLocais() {
        List<Local> locais = new ArrayList<>();
        String sql = "SELECT * FROM locais";

        try (Connection conn = MySQLConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Local l = new Local(
                        rs.getInt("id_local"),
                        rs.getString("nome_local"),
                        rs.getString("localizacao"),
                        rs.getString("link"),
                        rs.getString("imagem")
                );
                locais.add(l);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return locais;
    }
}

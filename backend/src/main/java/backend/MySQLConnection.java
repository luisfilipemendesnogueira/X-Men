package backend;

import java.sql.Connection;
import java.sql.DriverManager;
import java.io.FileInputStream;
import java.util.Properties;

public class MySQLConnection {
    public static Connection getConnection() {
        try {
            String url = System.getenv("SPRING_DATASOURCE_URL");
            String user = System.getenv("SPRING_DATASOURCE_USERNAME");
            String password = System.getenv("SPRING_DATASOURCE_PASSWORD");

            if (url == null) {
                url = "jdbc:mysql://db:3306/xmen_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC&useUnicode=true&characterEncoding=UTF-8";
            }
            if (user == null) {
                user = "xmen_user";
            }
            if (password == null) {
                password = "xmen_password";
            }

            System.out.println("Tentando conectar com URL: " + url);
            System.out.println("Usuário: " + user);
            
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(url, user, password);
            System.out.println("Conexão com MySQL estabelecida com sucesso!");
            return conn;
        } catch (Exception e) {
            System.err.println("Erro ao conectar com MySQL: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}

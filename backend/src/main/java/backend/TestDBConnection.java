package backend;

import java.sql.Connection;

public class TestDBConnection {
    public static void main(String[] args) {
        Connection conn = MySQLConnection.getConnection();
        if (conn != null) {
            System.out.println("Conexão funcionando!");
        } else {
            System.out.println("Falha na conexão!");
        }
    }
}

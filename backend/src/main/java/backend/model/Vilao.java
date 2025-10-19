package backend.model;

public class Vilao {
    private int idVilao;
    private String alterEgo;
    private String nome;
    private String sobrenome;
    private String imagem;

    // Construtor vazio
    public Vilao() {}

    // Construtor completo
    public Vilao(int idVilao, String alterEgo, String nome, String sobrenome, String imagem) {
        this.idVilao = idVilao;
        this.alterEgo = alterEgo;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.imagem = imagem;
    }

    // Getters e Setters
    public int getIdVilao() { return idVilao; }
    public void setIdVilao(int idVilao) { this.idVilao = idVilao; }

    public String getAlterEgo() { return alterEgo; }
    public void setAlterEgo(String alterEgo) { this.alterEgo = alterEgo; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getSobrenome() { return sobrenome; }
    public void setSobrenome(String sobrenome) { this.sobrenome = sobrenome; }

    public String getImagem() { return imagem; }
    public void setImagem(String imagem) { this.imagem = imagem; }
}

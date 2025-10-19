package backend.model;

public class Mutante {
    private int idMutante;
    private String alterEgo;
    private String nome;
    private String sobrenome;
    private String link;
    private String imagem;
    private String tipo;

    // Construtor vazio
    public Mutante() {}

    // Construtor completo
    public Mutante(int idMutante, String alterEgo, String nome, String sobrenome, String link, String imagem, String tipo) {
        this.idMutante = idMutante;
        this.alterEgo = alterEgo;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.link = link;
        this.imagem = imagem;
        this.tipo = tipo;
    }

    // Getters e Setters
    public int getIdMutante() { return idMutante; }
    public void setIdMutante(int idMutante) { this.idMutante = idMutante; }

    public String getAlterEgo() { return alterEgo; }
    public void setAlterEgo(String alterEgo) { this.alterEgo = alterEgo; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getSobrenome() { return sobrenome; }
    public void setSobrenome(String sobrenome) { this.sobrenome = sobrenome; }

    public String getLink() { return link; }
    public void setLink(String link) { this.link = link; }

    public String getImagem() { return imagem; }
    public void setImagem(String imagem) { this.imagem = imagem; }
    
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
}

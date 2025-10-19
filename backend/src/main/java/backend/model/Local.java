package backend.model;

public class Local {
    private int idLocal;
    private String nomeLocal;
    private String localizacao;
    private String link;
    private String imagem;

    // Construtor vazio
    public Local() {}

    // Construtor completo
    public Local(int idLocal, String nomeLocal, String localizacao, String link, String imagem) {
        this.idLocal = idLocal;
        this.nomeLocal = nomeLocal;
        this.localizacao = localizacao;
        this.link = link;
        this.imagem = imagem;
    }

    // Getters e Setters
    public int getIdLocal() { return idLocal; }
    public void setIdLocal(int idLocal) { this.idLocal = idLocal; }

    public String getNomeLocal() { return nomeLocal; }
    public void setNomeLocal(String nomeLocal) { this.nomeLocal = nomeLocal; }

    public String getLocalizacao() { return localizacao; }
    public void setLocalizacao(String localizacao) { this.localizacao = localizacao; }

    public String getLink() { return link; }
    public void setLink(String link) { this.link = link; }

    public String getImagem() { return imagem; }
    public void setImagem(String imagem) { this.imagem = imagem; }
}

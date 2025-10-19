package backend.model;

import java.util.List;

public class Missao {
    private int idMissao;
    private int idVilao;
    private int idLocal;
    private List<Integer> idHerois; // IDs dos heróis associados
    private int dificuldade;

    public Missao() {}

    public Missao(int idMissao, int idVilao, int idLocal, List<Integer> idHerois, int dificuldade) {
        this.idMissao = idMissao;
        this.idVilao = idVilao;
        this.idLocal = idLocal;
        this.idHerois = idHerois;
        this.dificuldade = dificuldade;
    }

    public int getIdMissao() { return idMissao; }
    public void setIdMissao(int idMissao) { this.idMissao = idMissao; }

    public int getIdVilao() { return idVilao; }
    public void setIdVilao(int idVilao) { this.idVilao = idVilao; }

    public int getIdLocal() { return idLocal; }
    public void setIdLocal(int idLocal) { this.idLocal = idLocal; }

    public List<Integer> getIdHerois() { return idHerois; }
    public void setIdHerois(List<Integer> idHerois) { this.idHerois = idHerois; }
    
    public int getDificuldade() { return dificuldade; }
    public void setDificuldade(int dificuldade) { this.dificuldade = dificuldade; }
}

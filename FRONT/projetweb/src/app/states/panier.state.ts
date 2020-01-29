import {NgxsModule,Action,Selector,State, StateContext} from '@ngxs/store';
import {PanierStateModel} from './panier.state.model';
import {AddProduit, DelProduit} from '../actions/produit.action';

@State<PanierStateModel>({
    name: 'panier',
    defaults: {
        panier: []
    }
})

export class PanierState {

  @Selector()
    static getPanier(state: PanierStateModel) {
        return state.panier;
    }

  @Action(AddProduit)
    add ({getState, patchState }: StateContext<PanierStateModel>, { payload }: AddProduit) {
        const state = getState();
        patchState({
            panier: [...state.panier, payload]
        });
    }

 @Action(DelProduit)
    del ({getState, patchState }: StateContext<PanierStateModel>, { payload }: DelProduit) {
        const state = getState();
        patchState({
            panier: [...(state.panier.slice(0,-1))]
        });
    }   
}
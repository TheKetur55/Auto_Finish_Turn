import { Mod } from "../mod";
import { AutoFinishTurnButton } from "./auto-finish-turn-btn";
import { SettingsService } from "app/core/service/settings.service";
import { TranslateService } from "@ngx-translate/core";
export class AutoFinishTurn extends Mod {

    startMod() { }
    protected button: AutoFinishTurnButton;
    settings: any;
    constructor(
        wGame: any,
        settings: SettingsService,
        translate: TranslateService

    ) {
        super(wGame, settings, translate);
        (window as any).wGame = wGame;
        this.button = new AutoFinishTurnButton(wGame);
        this.on(this.wGame.dofus.connectionManager, 'GameFightTurnStartMessage', this.finishTurn.bind(this));
        this.settings
    }



    private finishTurn(actor: any): void {
        if (this.isModActive() &&
            this.isFighting() &&
            this.isPvMFight() &&
            this.isMyTurn(actor.id)
        ) {
            this.wGame.gui.fightManager.finishTurn();
        }
    }

    private isModActive(): boolean {
        const bool = this.button.isEnable();
        //console.log('auto-finish-turn@isModActive', bool);
        return bool;
    }

    private isFighting(): boolean {
        const bool = this.wGame.gui.fightManager.fightState == 1;
        //console.log('auto-finish-turn@isFighting', bool);
        return bool;
    }

    private isMyTurn(actor_id: number): boolean {
        const playerInfo = this.wGame.gui.playerData.characterBaseInformations;
        const bool = playerInfo.id == actor_id;
        //console.log('auto-finish-turn@isMyTurn (' + playerInfo.name + ')', bool);
        return bool;
    }

    private isPvMFight(): boolean {
        const fighters = this.wGame.gui.fightManager.getFighters();
        const bool = fighters.includes(-1);
        //console.log('auto-finish-turn@isPvMFight', bool);
        return bool;
    }

    public reset() {}
}

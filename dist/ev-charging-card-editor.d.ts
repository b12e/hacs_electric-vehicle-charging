import { LitElement, CSSResultGroup, TemplateResult } from 'lit';
import { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
interface EVChargingCardConfig {
    type: string;
    name?: string;
    battery_entity: string;
    max_capacity: number;
    power_entity?: string;
    voltage_entity?: string;
    amperage_entity?: string;
    show_name?: boolean;
    show_metrics?: boolean;
    compact?: boolean;
}
export declare class EVChargingCardEditor extends LitElement implements LovelaceCardEditor {
    hass: HomeAssistant;
    private _config;
    setConfig(config: EVChargingCardConfig): void;
    private _valueChanged;
    private _entitiesByDomain;
    protected render(): TemplateResult;
    static get styles(): CSSResultGroup;
}
declare global {
    interface HTMLElementTagNameMap {
        'ev-charging-card-editor': EVChargingCardEditor;
    }
}
export {};
//# sourceMappingURL=ev-charging-card-editor.d.ts.map
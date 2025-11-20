import { LitElement, PropertyValues, CSSResultGroup, TemplateResult } from 'lit';
import { HomeAssistant, LovelaceCardConfig } from 'custom-card-helpers';
import './ev-charging-card-editor';
interface EVChargingCardConfig extends LovelaceCardConfig {
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
export declare class EVChargingCard extends LitElement {
    hass: HomeAssistant;
    private config;
    static getStubConfig(): EVChargingCardConfig;
    setConfig(config: EVChargingCardConfig): void;
    protected shouldUpdate(changedProps: PropertyValues): boolean;
    private getEntityState;
    private getNumericValue;
    private isCharging;
    private getChargingSpeed;
    protected render(): TemplateResult;
    static get styles(): CSSResultGroup;
    getCardSize(): number;
    static getConfigElement(): import("./ev-charging-card-editor").EVChargingCardEditor;
}
declare global {
    interface HTMLElementTagNameMap {
        'ev-charging-card': EVChargingCard;
    }
}
export {};
//# sourceMappingURL=ev-charging-card.d.ts.map
import {
  LitElement,
  html,
  css,
  PropertyValues,
  CSSResultGroup,
  TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardConfig } from 'custom-card-helpers';

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
  theme?: 'default' | 'dark' | 'light';
}

interface EntityState {
  state: string;
  attributes: {
    unit_of_measurement?: string;
    friendly_name?: string;
    [key: string]: any;
  };
}

@customElement('ev-charging-card')
export class EVChargingCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: EVChargingCardConfig;

  static getStubConfig(): EVChargingCardConfig {
    return {
      type: 'custom:ev-charging-card',
      battery_entity: '',
      max_capacity: 17.4,
      show_name: true,
      show_metrics: true,
    };
  }

  public setConfig(config: EVChargingCardConfig): void {
    if (!config.battery_entity) {
      throw new Error('You need to define a battery_entity');
    }
    if (!config.max_capacity || config.max_capacity <= 0) {
      throw new Error('You need to define a valid max_capacity (greater than 0)');
    }

    this.config = {
      show_name: true,
      show_metrics: true,
      theme: 'default',
      ...config,
    };
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) {
      return false;
    }

    if (changedProps.has('config')) {
      return true;
    }

    const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
    if (!oldHass) {
      return true;
    }

    const entities = [
      this.config.battery_entity,
      this.config.power_entity,
      this.config.voltage_entity,
      this.config.amperage_entity,
    ].filter(Boolean) as string[];

    return entities.some(
      (entity) => oldHass.states[entity] !== this.hass.states[entity]
    );
  }

  private getEntityState(entityId?: string): EntityState | null {
    if (!entityId || !this.hass) return null;
    return this.hass.states[entityId] || null;
  }

  private getNumericValue(entityId?: string): number {
    const state = this.getEntityState(entityId);
    if (!state) return 0;
    const value = parseFloat(state.state);
    return isNaN(value) ? 0 : value;
  }

  private isCharging(): boolean {
    const power = this.getNumericValue(this.config.power_entity);
    return power > 0;
  }

  private getChargingSpeed(): 'slow' | 'medium' | 'fast' {
    const power = this.getNumericValue(this.config.power_entity);
    if (power === 0) return 'slow';
    if (power < 3000) return 'slow';
    if (power < 7000) return 'medium';
    return 'fast';
  }

  protected render(): TemplateResult {
    if (!this.hass || !this.config) {
      return html``;
    }

    const batteryState = this.getEntityState(this.config.battery_entity);
    if (!batteryState) {
      return html`
        <ha-card>
          <div class="card-content error">
            <p>Entity not found: ${this.config.battery_entity}</p>
          </div>
        </ha-card>
      `;
    }

    const currentBattery = this.getNumericValue(this.config.battery_entity);
    const maxCapacity = this.config.max_capacity;
    const percentage = Math.min(100, Math.max(0, (currentBattery / maxCapacity) * 100));

    const power = this.getNumericValue(this.config.power_entity);
    const voltage = this.getNumericValue(this.config.voltage_entity);
    const amperage = this.getNumericValue(this.config.amperage_entity);

    const powerState = this.getEntityState(this.config.power_entity);
    const voltageState = this.getEntityState(this.config.voltage_entity);
    const amperageState = this.getEntityState(this.config.amperage_entity);

    const isCharging = this.isCharging();
    const chargingSpeed = this.getChargingSpeed();

    return html`
      <ha-card>
        <div class="card-content">
          ${this.config.show_name && this.config.name
            ? html`<h2 class="card-title">${this.config.name}</h2>`
            : ''}

          <div class="battery-container">
            <div class="battery-icon ${isCharging ? 'charging' : ''}">
              <div class="battery-body">
                <div class="battery-level" style="width: ${percentage}%"></div>
                ${isCharging
                  ? html`<div class="charging-indicator ${chargingSpeed}">
                      <div class="bolt">⚡</div>
                    </div>`
                  : ''}
              </div>
              <div class="battery-terminal"></div>
            </div>
          </div>

          <div class="battery-info">
            <div class="capacity">
              <span class="current">${currentBattery.toFixed(1)}</span>
              <span class="separator">/</span>
              <span class="max">${maxCapacity.toFixed(1)}</span>
              <span class="unit">kWh</span>
            </div>
            <div class="percentage">${percentage.toFixed(0)}%</div>
          </div>

          ${this.config.show_metrics &&
          (this.config.power_entity ||
            this.config.voltage_entity ||
            this.config.amperage_entity)
            ? html`
                <div class="metrics">
                  ${this.config.power_entity
                    ? html`
                        <div class="metric">
                          <div class="metric-icon">⚡</div>
                          <div class="metric-content">
                            <div class="metric-label">Power</div>
                            <div class="metric-value">
                              ${power.toFixed(0)}
                              ${powerState?.attributes?.unit_of_measurement || 'W'}
                            </div>
                          </div>
                        </div>
                      `
                    : ''}
                  ${this.config.voltage_entity
                    ? html`
                        <div class="metric">
                          <div class="metric-icon">🔌</div>
                          <div class="metric-content">
                            <div class="metric-label">Voltage</div>
                            <div class="metric-value">
                              ${voltage.toFixed(1)}
                              ${voltageState?.attributes?.unit_of_measurement || 'V'}
                            </div>
                          </div>
                        </div>
                      `
                    : ''}
                  ${this.config.amperage_entity
                    ? html`
                        <div class="metric">
                          <div class="metric-icon">⚡</div>
                          <div class="metric-content">
                            <div class="metric-label">Current</div>
                            <div class="metric-value">
                              ${amperage.toFixed(1)}
                              ${amperageState?.attributes?.unit_of_measurement || 'A'}
                            </div>
                          </div>
                        </div>
                      `
                    : ''}
                </div>
              `
            : ''}
        </div>
      </ha-card>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
      }

      ha-card {
        padding: 16px;
      }

      .card-content {
        padding: 0;
      }

      .error {
        color: var(--error-color);
        padding: 16px;
      }

      .card-title {
        margin: 0 0 16px 0;
        font-size: 24px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .battery-container {
        display: flex;
        justify-content: center;
        margin: 24px 0;
      }

      .battery-icon {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        max-width: 300px;
      }

      .battery-body {
        position: relative;
        width: 100%;
        height: 80px;
        border: 3px solid var(--primary-text-color);
        border-radius: 8px;
        background: var(--card-background-color);
        overflow: hidden;
      }

      .battery-level {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        background: linear-gradient(90deg, #4caf50 0%, #8bc34a 100%);
        transition: width 0.5s ease-in-out;
      }

      .battery-terminal {
        width: 8px;
        height: 40px;
        background: var(--primary-text-color);
        border-radius: 0 4px 4px 0;
        margin-left: 2px;
      }

      .charging-indicator {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
      }

      .bolt {
        font-size: 32px;
        animation: pulse 1s ease-in-out infinite;
        filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.8));
      }

      .charging-indicator.slow .bolt {
        animation-duration: 2s;
      }

      .charging-indicator.medium .bolt {
        animation-duration: 1s;
      }

      .charging-indicator.fast .bolt {
        animation-duration: 0.5s;
      }

      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.7;
          transform: scale(1.1);
        }
      }

      .battery-info {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin: 16px 0;
        padding: 0 8px;
      }

      .capacity {
        display: flex;
        align-items: baseline;
        gap: 4px;
        font-size: 20px;
      }

      .capacity .current {
        font-weight: 600;
        color: var(--primary-text-color);
      }

      .capacity .separator {
        color: var(--secondary-text-color);
      }

      .capacity .max {
        color: var(--secondary-text-color);
      }

      .capacity .unit {
        font-size: 16px;
        color: var(--secondary-text-color);
        margin-left: 4px;
      }

      .percentage {
        font-size: 28px;
        font-weight: 600;
        color: var(--primary-text-color);
      }

      .metrics {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 12px;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid var(--divider-color);
      }

      .metric {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background: var(--secondary-background-color);
        border-radius: 8px;
      }

      .metric-icon {
        font-size: 24px;
        opacity: 0.8;
      }

      .metric-content {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .metric-label {
        font-size: 12px;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .metric-value {
        font-size: 18px;
        font-weight: 600;
        color: var(--primary-text-color);
      }

      @media (max-width: 600px) {
        .metrics {
          grid-template-columns: 1fr;
        }
      }
    `;
  }

  public getCardSize(): number {
    return 3;
  }

  static getConfigElement() {
    return document.createElement('ev-charging-card-editor');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ev-charging-card': EVChargingCard;
  }
}

// Register the card with Home Assistant
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'ev-charging-card',
  name: 'EV Charging Card',
  description: 'Display electric vehicle charging progress with real-time metrics',
});

console.info(
  '%c EV-CHARGING-CARD %c Version 1.0.0 ',
  'color: white; background: #4caf50; font-weight: 700;',
  'color: #4caf50; background: white; font-weight: 700;'
);

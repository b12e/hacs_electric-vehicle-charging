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
      compact: false,
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
      compact: false,
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

    // Compact mode - true Mushroom style (single line)
    if (this.config.compact) {
      return html`
        <ha-card class="compact">
          <div class="mushroom-layout">
            <div class="mushroom-icon-container">
              <div class="mushroom-icon ${isCharging ? 'charging' : ''}">
                ${isCharging
                  ? html`<div class="charging-bolt ${chargingSpeed}">⚡</div>`
                  : html`<div class="battery-static">🔋</div>`}
              </div>
            </div>
            <div class="mushroom-content">
              <div class="mushroom-title">
                ${this.config.name || 'Battery'} • ${percentage.toFixed(0)}%
              </div>
              <div class="mushroom-state">
                ${currentBattery.toFixed(1)} / ${maxCapacity.toFixed(1)} kWh
                ${isCharging && power > 0 ? html` • ${power.toFixed(0)}W` : ''}
              </div>
            </div>
          </div>
        </ha-card>
      `;
    }

    // Regular mode - more detailed
    return html`
      <ha-card>
        <div class="card-content">
          ${this.config.show_name && this.config.name
            ? html`<div class="card-header">
                <div class="name">${this.config.name}</div>
              </div>`
            : ''}

          <div class="main-section">
            <div class="icon-container">
              <div class="battery-icon ${isCharging ? 'charging' : ''}">
                ${isCharging
                  ? html`<div class="charging-bolt ${chargingSpeed}">⚡</div>`
                  : html`<div class="battery-static">🔋</div>`}
              </div>
            </div>

            <div class="content-section">
              <div class="primary-info">
                <div class="percentage">${percentage.toFixed(0)}%</div>
                <div class="capacity">
                  ${currentBattery.toFixed(1)} / ${maxCapacity.toFixed(1)} kWh
                </div>
              </div>

              <div class="progress-bar-container">
                <div class="progress-bar">
                  <div
                    class="progress-fill ${isCharging ? 'charging' : ''}"
                    style="width: ${percentage}%"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          ${this.config.show_metrics &&
          (this.config.power_entity ||
            this.config.voltage_entity ||
            this.config.amperage_entity)
            ? html`
                <div class="metrics-section">
                  ${this.config.power_entity
                    ? html`
                        <div class="metric-item">
                          <div class="metric-icon">⚡</div>
                          <div class="metric-info">
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
                        <div class="metric-item">
                          <div class="metric-icon">🔌</div>
                          <div class="metric-info">
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
                        <div class="metric-item">
                          <div class="metric-icon">🔆</div>
                          <div class="metric-info">
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
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 12px;
      }

      .card-content {
        display: flex;
        flex-direction: column;
        gap: 12px;
        flex: 1;
      }

      .error {
        color: var(--error-color);
        padding: 12px;
      }

      /* Header Section */
      .card-header {
        display: flex;
        align-items: center;
        margin-bottom: 4px;
      }

      .name {
        font-size: 16px;
        font-weight: 500;
        color: var(--primary-text-color);
        line-height: 1.2;
      }

      /* ========================================
         MUSHROOM COMPACT MODE
         ======================================== */
      ha-card.compact {
        padding: 12px;
      }

      .mushroom-layout {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .mushroom-icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 42px;
        height: 42px;
      }

      .mushroom-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: color-mix(
          in srgb,
          var(--state-icon-color, var(--state-inactive-color)) 10%,
          transparent
        );
        transition: background 0.3s ease;
      }

      .mushroom-icon.charging {
        background: color-mix(
          in srgb,
          var(--state-icon-active-color, var(--state-active-color)) 20%,
          transparent
        );
      }

      .mushroom-icon .charging-bolt,
      .mushroom-icon .battery-static {
        font-size: 24px;
        line-height: 1;
      }

      .mushroom-content {
        display: flex;
        flex-direction: column;
        gap: 2px;
        flex: 1;
        min-width: 0;
      }

      .mushroom-title {
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .mushroom-state {
        font-size: 12px;
        font-weight: 400;
        color: var(--secondary-text-color);
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      /* Main Section - Horizontal Layout (Mushroom Style) */
      .main-section {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      /* Icon Container - Left Side */
      .icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 42px;
        height: 42px;
      }

      .battery-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: color-mix(in srgb, var(--state-icon-color, var(--state-inactive-color)) 10%, transparent);
        transition: background 0.3s ease;
      }

      .battery-icon.charging {
        background: color-mix(in srgb, var(--state-icon-active-color, var(--state-active-color)) 20%, transparent);
      }

      .charging-bolt,
      .battery-static {
        font-size: 28px;
        line-height: 1;
      }

      .charging-bolt {
        animation: pulse 1s ease-in-out infinite;
      }

      .charging-bolt.slow {
        animation-duration: 2s;
      }

      .charging-bolt.medium {
        animation-duration: 1s;
      }

      .charging-bolt.fast {
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
          transform: scale(1.15);
        }
      }

      /* Content Section - Right Side */
      .content-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
        flex: 1;
        min-width: 0;
      }

      .primary-info {
        display: flex;
        align-items: baseline;
        gap: 8px;
        flex-wrap: wrap;
      }

      .percentage {
        font-size: 22px;
        font-weight: 600;
        color: var(--primary-text-color);
        line-height: 1;
      }

      .capacity {
        font-size: 14px;
        font-weight: 400;
        color: var(--secondary-text-color);
        line-height: 1;
      }

      /* Progress Bar */
      .progress-bar-container {
        width: 100%;
      }

      .progress-bar {
        position: relative;
        width: 100%;
        height: 4px;
        background: color-mix(in srgb, var(--state-icon-color, var(--state-inactive-color)) 20%, transparent);
        border-radius: 2px;
        overflow: hidden;
      }

      .progress-fill {
        height: 100%;
        background: var(--state-icon-color, var(--state-inactive-color));
        border-radius: 2px;
        transition: width 0.5s ease-in-out;
      }

      .progress-fill.charging {
        background: var(--state-icon-active-color, var(--state-active-color));
      }

      /* Metrics Section */
      .metrics-section {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 4px;
        padding-top: 12px;
        border-top: 1px solid var(--divider-color);
      }

      .metric-item {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
        min-width: 0;
        padding: 8px;
        background: color-mix(in srgb, var(--primary-text-color) 5%, transparent);
        border-radius: 12px;
      }

      .metric-icon {
        font-size: 20px;
        opacity: 0.7;
        flex-shrink: 0;
      }

      .metric-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
        flex: 1;
      }

      .metric-label {
        font-size: 11px;
        font-weight: 500;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        line-height: 1;
      }

      .metric-value {
        font-size: 14px;
        font-weight: 600;
        color: var(--primary-text-color);
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      /* Responsive Design */
      @media (max-width: 600px) {
        .metrics-section {
          flex-direction: column;
        }

        .metric-item {
          flex: none;
          width: 100%;
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

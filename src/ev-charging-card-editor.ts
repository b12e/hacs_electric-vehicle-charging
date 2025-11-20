import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, fireEvent, LovelaceCardEditor } from 'custom-card-helpers';

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
}

@customElement('ev-charging-card-editor')
export class EVChargingCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: EVChargingCardConfig;

  public setConfig(config: EVChargingCardConfig): void {
    this._config = config;
  }

  private _valueChanged(ev: CustomEvent): void {
    if (!this._config || !this.hass) {
      return;
    }

    const target = ev.target as any;
    const configValue = target.configValue as keyof EVChargingCardConfig;
    const value = target.checked !== undefined ? target.checked : target.value;

    if (this._config[configValue] === value) {
      return;
    }

    const newConfig = {
      ...this._config,
    };

    if (configValue) {
      if (value === '' || value === undefined) {
        delete newConfig[configValue];
      } else {
        (newConfig as any)[configValue] = value;
      }
    }

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _entitiesByDomain(domain: string): string[] {
    if (!this.hass) return [];
    return Object.keys(this.hass.states)
      .filter((entityId) => entityId.startsWith(`${domain}.`))
      .sort();
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    const entities = this._entitiesByDomain('sensor');

    return html`
      <div class="card-config">
        <div class="header">
          <div class="title">Electric Vehicle Charging Card Configuration</div>
          <div class="subtitle">Configure your EV charging display</div>
        </div>

        <div class="section">
          <div class="section-title">Required Settings</div>

          <ha-entity-picker
            .label=${'Battery Entity (Required)'}
            .hass=${this.hass}
            .value=${this._config.battery_entity || ''}
            .configValue=${'battery_entity'}
            @value-changed=${this._valueChanged}
            .includeDomains=${['sensor']}
            allow-custom-entity
          ></ha-entity-picker>

          <paper-input
            label="Maximum Capacity (kWh)"
            .value=${this._config.max_capacity || ''}
            .configValue=${'max_capacity'}
            type="number"
            step="0.1"
            min="0"
            @value-changed=${this._valueChanged}
          ></paper-input>
          <div class="help-text">
            Enter your battery's maximum capacity in kWh (e.g., 17.4 for a 17.4 kWh battery)
          </div>
        </div>

        <div class="section">
          <div class="section-title">Display Options</div>

          <paper-input
            label="Card Name (Optional)"
            .value=${this._config.name || ''}
            .configValue=${'name'}
            @value-changed=${this._valueChanged}
          ></paper-input>

          <ha-formfield label="Show Card Name">
            <ha-switch
              .checked=${this._config.show_name !== false}
              .configValue=${'show_name'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Metrics Panel">
            <ha-switch
              .checked=${this._config.show_metrics !== false}
              .configValue=${'show_metrics'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>
        </div>

        <div class="section">
          <div class="section-title">Charging Metrics (Optional)</div>
          <div class="help-text">
            Add these entities to display real-time charging information and enable animations
          </div>

          <ha-entity-picker
            .label=${'Power Entity (Watts)'}
            .hass=${this.hass}
            .value=${this._config.power_entity || ''}
            .configValue=${'power_entity'}
            @value-changed=${this._valueChanged}
            .includeDomains=${['sensor']}
            allow-custom-entity
          ></ha-entity-picker>

          <ha-entity-picker
            .label=${'Voltage Entity (Optional)'}
            .hass=${this.hass}
            .value=${this._config.voltage_entity || ''}
            .configValue=${'voltage_entity'}
            @value-changed=${this._valueChanged}
            .includeDomains=${['sensor']}
            allow-custom-entity
          ></ha-entity-picker>

          <ha-entity-picker
            .label=${'Current/Amperage Entity (Optional)'}
            .hass=${this.hass}
            .value=${this._config.amperage_entity || ''}
            .configValue=${'amperage_entity'}
            @value-changed=${this._valueChanged}
            .includeDomains=${['sensor']}
            allow-custom-entity
          ></ha-entity-picker>
        </div>

        <div class="tips">
          <div class="tips-title">💡 Tips</div>
          <ul>
            <li>The battery entity should report in kWh</li>
            <li>Power entity enables the animated charging indicator</li>
            <li>Animation speed changes based on charging power</li>
            <li>All metric entities are optional but recommended for full functionality</li>
          </ul>
        </div>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
      }

      .card-config {
        padding: 16px;
      }

      .header {
        margin-bottom: 24px;
      }

      .title {
        font-size: 20px;
        font-weight: 500;
        color: var(--primary-text-color);
        margin-bottom: 4px;
      }

      .subtitle {
        font-size: 14px;
        color: var(--secondary-text-color);
      }

      .section {
        margin-bottom: 24px;
        padding: 16px;
        background: var(--secondary-background-color);
        border-radius: 8px;
      }

      .section-title {
        font-size: 16px;
        font-weight: 500;
        color: var(--primary-text-color);
        margin-bottom: 16px;
      }

      .help-text {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-top: 8px;
        margin-bottom: 16px;
        font-style: italic;
      }

      ha-entity-picker,
      paper-input {
        display: block;
        margin-bottom: 16px;
        width: 100%;
      }

      ha-formfield {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        padding: 8px 0;
      }

      ha-switch {
        margin-left: auto;
      }

      .tips {
        padding: 16px;
        background: var(--info-color, #2196f3);
        background: color-mix(in srgb, var(--info-color, #2196f3) 10%, transparent);
        border-radius: 8px;
        border-left: 4px solid var(--info-color, #2196f3);
      }

      .tips-title {
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
        margin-bottom: 8px;
      }

      .tips ul {
        margin: 0;
        padding-left: 20px;
        color: var(--secondary-text-color);
        font-size: 13px;
      }

      .tips li {
        margin-bottom: 4px;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ev-charging-card-editor': EVChargingCardEditor;
  }
}

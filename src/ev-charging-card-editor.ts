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
  compact?: boolean;
}

@customElement('ev-charging-card-editor')
export class EVChargingCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: EVChargingCardConfig;
  @state() private _helpers?: any;

  public setConfig(config: EVChargingCardConfig): void {
    this._config = {
      show_name: true,
      show_metrics: true,
      compact: false,
      ...config,
    };
    this.loadEntityPicker();
  }

  protected async loadEntityPicker(): Promise<void> {
    if (!window.customElements.get('ha-entity-picker')) {
      const ch = await (window as any).loadCardHelpers();
      const c = await ch.createCardElement({ type: 'entities', entities: [] });
      await c.constructor.getConfigElement();
    }
  }

  protected shouldUpdate(): boolean {
    return true;
  }

  private _renderEntityPicker(value: string, label: string, onChange: (ev: CustomEvent) => void): TemplateResult {
    return html`
      <ha-entity-picker
        .hass=${this.hass}
        .value=${value}
        .includeDomains=${['sensor']}
        .entityFilter=${(entity: any) => entity.entity_id.startsWith('sensor.')}
        allow-custom-entity
        @value-changed=${onChange}
      ></ha-entity-picker>
    `;
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    const isCompact = this._config.compact === true;

    return html`
      <div class="card-config">
        <!-- Battery Entity -->
        <div class="field">
          <label>Battery Entity (required)</label>
          ${this._renderEntityPicker(
            this._config.battery_entity || '',
            'Battery Entity',
            this._batteryChanged
          )}
        </div>

        <!-- Max Capacity -->
        <ha-textfield
          label="Maximum Capacity (kWh)"
          .value=${String(this._config.max_capacity || '')}
          type="number"
          step="0.1"
          min="0"
          required
          @input=${this._maxCapacityChanged}
        ></ha-textfield>

        <!-- Card Name -->
        <ha-textfield
          label="Card Name (optional)"
          .value=${this._config.name || ''}
          @input=${this._nameChanged}
        ></ha-textfield>

        <!-- Power Entity -->
        <div class="field">
          <label>Power Entity (optional)</label>
          ${this._renderEntityPicker(
            this._config.power_entity || '',
            'Power Entity',
            this._powerChanged
          )}
        </div>

        <!-- Voltage Entity -->
        ${!isCompact
          ? html`
              <div class="field">
                <label>Voltage Entity (optional)</label>
                ${this._renderEntityPicker(
                  this._config.voltage_entity || '',
                  'Voltage Entity',
                  this._voltageChanged
                )}
              </div>
            `
          : ''}

        <!-- Amperage Entity -->
        ${!isCompact
          ? html`
              <div class="field">
                <label>Current/Amperage Entity (optional)</label>
                ${this._renderEntityPicker(
                  this._config.amperage_entity || '',
                  'Amperage Entity',
                  this._amperageChanged
                )}
              </div>
            `
          : ''}

        <!-- Switches -->
        <ha-formfield
          .label=${'Show Metrics Panel'}
          .disabled=${isCompact}
        >
          <ha-switch
            .checked=${!isCompact && this._config.show_metrics !== false}
            .disabled=${isCompact}
            @change=${this._showMetricsChanged}
          ></ha-switch>
        </ha-formfield>

        <ha-formfield .label=${'Compact Mode'}>
          <ha-switch
            .checked=${this._config.compact === true}
            @change=${this._compactChanged}
          ></ha-switch>
        </ha-formfield>
      </div>
    `;
  }

  private _batteryChanged(ev: CustomEvent): void {
    if (!this._config || !ev.detail.value) {
      return;
    }
    this._updateConfig({ battery_entity: ev.detail.value });
  }

  private _maxCapacityChanged(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    const value = parseFloat(target.value);
    if (!this._config || isNaN(value)) {
      return;
    }
    this._updateConfig({ max_capacity: value });
  }

  private _nameChanged(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    if (!this._config) {
      return;
    }
    const value = target.value;
    if (value === '') {
      const newConfig = { ...this._config };
      delete newConfig.name;
      this._config = newConfig;
      fireEvent(this, 'config-changed', { config: newConfig });
    } else {
      this._updateConfig({ name: value });
    }
  }

  private _powerChanged(ev: CustomEvent): void {
    if (!this._config) {
      return;
    }
    const value = ev.detail.value;
    if (value === '') {
      const newConfig = { ...this._config };
      delete newConfig.power_entity;
      this._config = newConfig;
      fireEvent(this, 'config-changed', { config: newConfig });
    } else {
      this._updateConfig({ power_entity: value });
    }
  }

  private _voltageChanged(ev: CustomEvent): void {
    if (!this._config) {
      return;
    }
    const value = ev.detail.value;
    if (value === '') {
      const newConfig = { ...this._config };
      delete newConfig.voltage_entity;
      this._config = newConfig;
      fireEvent(this, 'config-changed', { config: newConfig });
    } else {
      this._updateConfig({ voltage_entity: value });
    }
  }

  private _amperageChanged(ev: CustomEvent): void {
    if (!this._config) {
      return;
    }
    const value = ev.detail.value;
    if (value === '') {
      const newConfig = { ...this._config };
      delete newConfig.amperage_entity;
      this._config = newConfig;
      fireEvent(this, 'config-changed', { config: newConfig });
    } else {
      this._updateConfig({ amperage_entity: value });
    }
  }

  private _showMetricsChanged(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    if (!this._config) {
      return;
    }
    this._updateConfig({ show_metrics: target.checked });
  }

  private _compactChanged(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    if (!this._config) {
      return;
    }
    this._updateConfig({ compact: target.checked });
  }

  private _updateConfig(updates: Partial<EVChargingCardConfig>): void {
    this._config = { ...this._config, ...updates };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  static get styles(): CSSResultGroup {
    return css`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px 0;
      }

      .field {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .field label {
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      ha-entity-picker,
      ha-textfield {
        width: 100%;
      }

      ha-formfield {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 0;
      }

      ha-formfield[disabled] {
        opacity: 0.5;
        pointer-events: none;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ev-charging-card-editor': EVChargingCardEditor;
  }
}

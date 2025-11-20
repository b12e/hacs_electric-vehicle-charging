# Electric Vehicle Charging Card

A custom card for Home Assistant to display your electric vehicle's charging progress.

## Features

- 🔋 **Visual charging progress bar** with animated battery indicator
- ⚡ **Real-time charging metrics** (Power in Watts, Voltage, Current/Amperage)
- 🎬 **Animated charging indicator** that pulses faster based on charging speed
- ⚙️ **Fully configurable** - set your battery capacity and connect your own entities
- 📱 **Responsive design** that works perfectly on mobile and desktop
- 🎨 **Theme-aware** - automatically adapts to your Home Assistant theme

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Click on "Frontend"
3. Click the three dots menu in the top right
4. Select "Custom repositories"
5. Add the URL: `https://github.com/yourusername/hacs_electric-vehicle-charging`
6. Select category: "Lovelace"
7. Click "Add"
8. Find "Electric Vehicle Charging Card" in the list and click "Install"
9. Reload


## Configuration

### Minimal Configuration

```yaml
type: custom:ev-charging-card
battery_entity: sensor.ev_battery_level
max_capacity: 17.4
```

### Full Configuration

```yaml
type: custom:ev-charging-card
name: "My EV Charging"
battery_entity: sensor.ev_battery_level
max_capacity: 17.4
power_entity: sensor.ev_charging_power
voltage_entity: sensor.ev_voltage
amperage_entity: sensor.ev_current
show_name: true
show_metrics: true
```

### Configuration Variables

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `type` | string | **Yes** | - | Must be `custom:ev-charging-card` |
| `battery_entity` | string | **Yes** | - | Entity ID for current battery level in kWh |
| `max_capacity` | number | **Yes** | - | Maximum battery capacity in kWh (e.g., 17.4) |
| `name` | string | No | - | Card title (shown if `show_name` is true) |
| `power_entity` | string | No | - | Entity ID for charging power in Watts |
| `voltage_entity` | string | No | - | Entity ID for voltage |
| `amperage_entity` | string | No | - | Entity ID for current/amperage |
| `show_name` | boolean | No | `true` | Show the card title |
| `show_metrics` | boolean | No | `true` | Show the metrics panel |

### Home Battery System

This card can also be used for home battery systems:

```yaml
type: custom:ev-charging-card
name: "Home Battery"
battery_entity: sensor.powerwall_charge
max_capacity: 13.5
power_entity: sensor.powerwall_charging_power
show_metrics: true
```

## Animation Details

The charging indicator (lightning bolt) animates at different speeds based on the charging power:

- **Slow** (< 3000W): Pulses every 2 seconds
- **Medium** (3000-7000W): Pulses every 1 second
- **Fast** (> 7000W): Pulses every 0.5 seconds

The animation only appears when the power entity shows a value greater than 0.

## Creating Entities

If your EV integration doesn't provide all the entities you need, you can create template sensors in your `configuration.yaml`:

```yaml
template:
  - sensor:
      - name: "EV Battery Level"
        unit_of_measurement: "kWh"
        state: >
          {% set percentage = states('sensor.ev_battery_percentage') | float %}
          {{ (percentage / 100 * 17.4) | round(2) }}

      - name: "EV Charging Power"
        unit_of_measurement: "W"
        state: >
          {{ states('sensor.ev_charger_power') | float }}
```

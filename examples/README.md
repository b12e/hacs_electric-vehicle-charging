# Configuration Examples

This directory contains example configurations for the EV Charging Card.

## Files

- **basic-config.yaml** - Minimal configuration to get started
- **full-config.yaml** - All available options demonstrated
- **template-sensors.yaml** - Example template sensors for converting entity formats

## Using These Examples

1. Copy the relevant YAML configuration
2. Replace the entity IDs with your actual entity IDs
3. Adjust values like `max_capacity` to match your vehicle
4. Add the configuration to your Lovelace dashboard

## Finding Your Entity IDs

1. Go to **Developer Tools → States** in Home Assistant
2. Search for entities related to your EV or charger
3. Copy the entity ID (e.g., `sensor.my_ev_battery`)
4. Use these IDs in your configuration

## Common Integrations

### Tesla
- Look for entities starting with `sensor.tesla_`
- Battery is usually `sensor.tesla_battery_level`

### Zaptec
- Look for entities starting with `sensor.zaptec_`
- Power might be `sensor.zaptec_charge_power`

### Easee
- Look for entities starting with `sensor.easee_`
- Current might be `sensor.easee_current`

### Generic EVSE
- Check your integration's documentation
- Common patterns: `sensor.evse_*`, `sensor.charger_*`, `sensor.wallbox_*`

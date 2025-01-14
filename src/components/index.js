import React from "react"
import PropTypes from "prop-types"
import { FormField, set, unset } from "sanity"
import VisualOptions from "./VisualOptions"

const createPatchFrom = value => {
  if (value === "") {
    return unset()
  }
  return set(value)
}

class VisualOptionsContainer extends React.Component {
  focus() {
    this.inputElement ? this.inputElement.focus() : null
  }

  selectItem(item) {
    this.props.onChange(createPatchFrom(item))
  }

  render() {
    const { value, schemaType: type, level } = this.props
    console.log(this.props)

    return (
      <FormField
        label={type.title ? type.title : ""}
        description={type.description ? type.description : null}
        level={level}
      >
        <VisualOptions
          options={type.options.list}
          showLabel={type.options.showLabel}
          showTooltip={type.options.showTooltip}
          size={type.options.optionSize}
          shape={type.options.shape}
          value={value}
          ref={element =>
            !this.inputElement ? (this.inputElement = element) : null
          }
          onChange={item => this.selectItem(item)}
        />
      </FormField>
    )
  }
}

VisualOptionsContainer.propTypes = {
  value: PropTypes.string,
  options: PropTypes.shape({
    list: PropTypes.object,
  }),
  onChange: PropTypes.func.isRequired,
}

export default VisualOptionsContainer
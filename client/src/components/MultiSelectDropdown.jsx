import React from 'react'
import Select, { StylesConfig } from 'react-select'

const MAX_SELECTIONS = 3

// 選項
const options = [
  { value: 'dj', label: 'DJ' },
  { value: 'streetDance', label: '街舞' },
  { value: 'rap', label: '饒舌' },
  { value: 'graffiti', label: '塗鴉' },
  { value: 'skate', label: '滑板' },
  { value: 'new', label: '新上市' },
  { value: 'discount', label: '優惠' }
]

const MultiSelectDropdown = ({ selectedOptions, onChange }) => {
  const handleChange = (selected) => {
    if (selected.length <= MAX_SELECTIONS) {
      onChange(selected)
    }
  }

  const colourStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'transparent',
      borderColor: state.isFocused ? 'var(--main)' : 'black'
    }),
    options: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'black': 'black',
      color: state.isSelected ? 'var(--main)' : 'white'
    })
  }

  return (
    <div className='infoItem editTitle'>
      <label htmlFor='prdSort' className='editTitle'>
        商品分類：
      </label>
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        placeholder="選擇商品分類"
        styles={colourStyles}
      />
    </div>
  )
}
export default MultiSelectDropdown

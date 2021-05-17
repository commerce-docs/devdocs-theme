---
title: Dropdown
menu_title: Dropdown
menu_order: 3
---





```html
<div class="spectrum-Dropdown">
  <button id="dropdown" class="spectrum-FieldButton spectrum-Dropdown-trigger" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <span class="spectrum-Dropdown-label">Dropdown Label</span>
    <i class="spectrum-Icon spectrum-UIIcon-ChevronDownMedium spectrum-Dropdown-icon" focusable="false" aria-hidden="true"></i>
  </button>
  <div class="dropdown-menu spectrum-Popover spectrum-Popover--bottom spectrum-Picker-popover" aria-labelledby="dropdown">
    <ul class="spectrum-Menu" role="menu">
      <li class="spectrum-Menu-item" role="menuitem"><a class="spectrum-Menu-itemLabel" href="#">Item one</a></li>
      <li class="spectrum-Menu-item" role="menuitem"><a class="spectrum-Menu-itemLabel" href="#">Item two</a></li>
      <li class="spectrum-Menu-item" role="menuitem"><a class="spectrum-Menu-itemLabel" href="#">Item three</a></li>
    </ul>
  </div>
</div>
```

<div class="version-switcher">
  <button id="dropdown" class="spectrum-Picker spectrum-Picker--sizeM" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <span class="spectrum-Picker-label">Picker Label</span>
    <i class="spectrum-Icon spectrum-UIIcon-ChevronRight100 spectrum-Picker-icon" focusable="false" aria-hidden="true"></i>
  </button>
  <div class="dropdown-menu spectrum-Popover spectrum-Popover--bottom spectrum-Picker-popover" aria-labelledby="dropdown">
    <ul class="spectrum-Menu" role="menu">
      <li class="spectrum-Menu-item" role="menuitem"><a class="spectrum-Menu-itemLabel" href="#">Item one</a></li>
      <li class="spectrum-Menu-item" role="menuitem"><a class="spectrum-Menu-itemLabel" href="#">Item two</a></li>
      <li class="spectrum-Menu-item" role="menuitem"><a class="spectrum-Menu-itemLabel" href="#">Item three</a></li>
    </ul>
  </div>
</div>

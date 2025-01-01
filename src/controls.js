import { __ } from "@wordpress/i18n";

import { InspectorControls, PanelColorSettings } from "@wordpress/block-editor";

import {
  PanelBody,
  PanelRow,
  __experimentalInputControl as InputControl,
} from "@wordpress/components";

export default function Controls(props) {
  const { metaFieldName, renderType, beforeText, afterText, altText } =
    props.attributes;

  const handleMetaFieldNameChange = (value) => {
    props.setAttributes({ metaFieldName: value });
  };

  return (
    <InspectorControls>
      <PanelBody>
        <InputControl
          label={__("Meta field name", "afca-meta-field-block")}
          value={metaFieldName}
          onChange={handleMetaFieldNameChange}
        />
      </PanelBody>
    </InspectorControls>
  );
}

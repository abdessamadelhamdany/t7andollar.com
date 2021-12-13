import React, { FC } from 'react';
import 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/table';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/ui/oxide/content.min.css';
import 'tinymce/skins/content/default/content.min.css';
import { Editor } from '@tinymce/tinymce-react';

interface Props {
  placeholder?: string;
  value: string;
  initialValue?: string;
  onChange: (html: string) => void;
}

const TinyMCE: FC<Props> = ({
  placeholder = 'محتوى المقال',
  initialValue,
  value,
  onChange,
}) => {
  return (
    <Editor
      init={{
        menubar: false,
        plugins: ['link image', 'table paste', 'autoresize'],
        toolbar: `undo redo | formatselect | bold italic backcolor | link image table pase | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat`,
        placeholder,
        min_height: 400,
        directionality: 'rtl',
        images_upload_url: '/api/upload/photo',
        autoresize_bottom_margin: 50,
      }}
      value={value}
      initialValue={initialValue}
      onEditorChange={(html) => {
        onChange(html);
      }}
    />
  );
};

export default TinyMCE;

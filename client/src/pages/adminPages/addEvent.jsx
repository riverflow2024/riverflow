// Author: zhier1114
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import debounce from 'lodash/debounce'
import $ from 'jquery'
import 'jquery-ui/ui/widgets/tabs'
// CKEditor套件
import { CKEditor } from '@ckeditor/ckeditor5-react'
import {
  ClassicEditor,
  AccessibilityHelp,
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonToolbar,
  Base64UploadAdapter,
  BlockQuote,
  Bold,
  CloudServices,
  Code,
  CodeBlock,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalLine,
  HtmlEmbed,
  Image,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  SelectAll,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Table,
  TableCellProperties,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  Undo
} from 'ckeditor5'
import 'ckeditor5/ckeditor5.css'
import translations from 'ckeditor5/translations/zh.js'

export default function AddEvent() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  // 儲存的資料格式
  const [formData, setFormData] = useState({
    eventType: '',
    eventName: '',
    coverImg: '',
    eventAnoc: null,
    eventDesc: '',
    eventDate: '',
    location: '',
    seat: 0,
    ticketType: [],
    launchDate: '',
    launchStatus: 1,
    saleDate: ''
  })

  // 封面圖片處理
  const [fileName, setFileName] = useState('未選擇任何檔案')
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFileName(file.name)
      setFormData((prevState) => ({
        ...prevState,
        coverImg: file
      }))
    }
  }

  // 輸入框處理
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  // CKEditor 相關設定
  const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
  const editorConfig = {
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'heading',
        '|',
        'fontSize',
        'fontFamily',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        'underline',
        '|',
        'link',
        'insertImage',
        'insertTable',
        'highlight',
        'blockQuote',
        'codeBlock',
        '|',
        'alignment',
        '|',
        'bulletedList',
        'numberedList',
        'todoList',
        'outdent',
        'indent'
      ],
      shouldNotGroupWhenFull: false
    },
    plugins: [
      AccessibilityHelp,
      Alignment,
      Autoformat,
      AutoImage,
      AutoLink,
      Autosave,
      BalloonToolbar,
      Base64UploadAdapter,
      BlockQuote,
      Bold,
      CloudServices,
      Code,
      CodeBlock,
      Essentials,
      FindAndReplace,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      Heading,
      Highlight,
      HorizontalLine,
      HtmlEmbed,
      Image,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      MediaEmbed,
      Paragraph,
      PasteFromOffice,
      RemoveFormat,
      SelectAll,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersLatin,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Strikethrough,
      Table,
      TableCellProperties,
      TableProperties,
      TableToolbar,
      TextTransformation,
      TodoList,
      Underline,
      Undo
    ],
    balloonToolbar: ['bold', 'italic', '|', 'link', 'insertImage', '|', 'bulletedList', 'numberedList'],
    fontFamily: {
      supportAllValues: true
    },
    fontSize: {
      options: [10, 12, 14, 'default', 18, 20, 22],
      supportAllValues: true
    },
    heading: {
      options: [
        {
          model: 'paragraph',
          title: 'Paragraph',
          class: 'ck-heading_paragraph'
        },
        {
          model: 'heading1',
          view: 'h1',
          title: 'Heading 1',
          class: 'ck-heading_heading1'
        },
        {
          model: 'heading2',
          view: 'h2',
          title: 'Heading 2',
          class: 'ck-heading_heading2'
        },
        {
          model: 'heading3',
          view: 'h3',
          title: 'Heading 3',
          class: 'ck-heading_heading3'
        },
        {
          model: 'heading4',
          view: 'h4',
          title: 'Heading 4',
          class: 'ck-heading_heading4'
        },
        {
          model: 'heading5',
          view: 'h5',
          title: 'Heading 5',
          class: 'ck-heading_heading5'
        },
        {
          model: 'heading6',
          view: 'h6',
          title: 'Heading 6',
          class: 'ck-heading_heading6'
        }
      ]
    },
    image: {
      upload: {
        types: ['jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff']
      },
      toolbar: [
        'toggleImageCaption',
        'imageTextAlternative',
        '|',
        'imageStyle:inline',
        'imageStyle:wrapText',
        'imageStyle:breakText',
        '|',
        'resizeImage'
      ]
    },
    // initialData:
    //   '<h2>Congratulations on setting up CKEditor 5! </h2>\n<p>\n    You\'ve successfully created a CKEditor 5 project. This powerful text editor will enhance your application, enabling rich text editing\n    capabilities that are customizable and easy to use.\n</p>\n<h3>What\'s next?</h3>\n<ol>\n    <li>\n        <strong>Integrate into your app</strong>: time to bring the editing into your application. Take the code you created and add to your\n        application.\n    </li>\n    <li>\n        <strong>Explore features:</strong> Experiment with different plugins and toolbar options to discover what works best for your needs.\n    </li>\n    <li>\n        <strong>Customize your editor:</strong> Tailor the editor\'s configuration to match your application\'s style and requirements. Or even\n        write your plugin!\n    </li>\n</ol>\n<p>\n    Keep experimenting, and don\'t hesitate to push the boundaries of what you can achieve with CKEditor 5. Your feedback is invaluable to us\n    as we strive to improve and evolve. Happy editing!\n</p>\n<h3>Helpful resources</h3>\n<ul>\n    <li><a href="https://orders.ckeditor.com/trial/premium-features">Trial sign up</a>,</li>\n    <li><a href="https://ckeditor.com/docs/ckeditor5/latest/installation/index.html">Documentation</a>,</li>\n    <li><a href="https://github.com/ckeditor/ckeditor5">GitHub</a> (star us if you can!),</li>\n    <li><a href="https://ckeditor.com">CKEditor Homepage</a>,</li>\n    <li><a href="https://ckeditor.com/ckeditor-5/demo/">CKEditor 5 Demos</a>,</li>\n</ul>\n<h3>Need help?</h3>\n<p>\n    See this text, but the editor is not starting up? Check the browser\'s console for clues and guidance. It may be related to an incorrect\n    license key if you use premium features or another feature-related requirement. If you cannot make it work, file a GitHub issue, and we\n    will help as soon as possible!\n</p>\n',
    language: 'zh',
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: {
          mode: 'manual',
          label: 'Downloadable',
          attributes: {
            download: 'file'
          }
        }
      }
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true
      }
    },
    menuBar: {
      isVisible: true
    },
    placeholder: 'Type or paste your content here!',
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
    },
    translations: [translations]
  }
  // 編輯器開啟
  const editorContainerRef = useRef(null)
  const editorRef = useRef(null)
  const [editor, setEditor] = useState(null)
  const [isLayoutReady, setIsLayoutReady] = useState(false)
  useEffect(() => {
    if (editor) {
      editor.model.document.on('change:data', () => {
        console.log('編輯器內容已更改')
        const data = editor.getData()
        checkForImages(data)
      })
    }
  }, [editor])
  useEffect(() => {
    setIsLayoutReady(true)
    return () => setIsLayoutReady(false)
  }, [])

  // 圖片處理
  const uploadingImages = useRef(new Map())
  const uploadImage = useCallback(
    async (base64String) => {
      if (uploadingImages.current.get(base64String)) return

      uploadingImages.current.set(base64String, true)

      try {
        const base64Data = base64String.split(',')[1]
        const blob = b64toBlob(base64Data)

        if (blob.size > MAX_FILE_SIZE) {
          throw new Error('檔案大小超過 10MB 限制')
        }

        const formData = new FormData()
        formData.append('upload', blob, 'image.jpg')

        const uploadResponse = await axios.post('http://localhost:3000/riverflow/admin/events/imgUpload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          maxContentLength: Infinity,
          maxRedirects: 0
        })

        console.log('圖片上傳成功:', uploadResponse.data.url)

        if (editor) {
          const newContent = editor.getData().replace(base64String, uploadResponse.data.url)
          editor.setData(newContent)
        }
      } catch (error) {
        console.error('圖片上傳失敗:', error.message)
        if (error.message === '檔案大小超過 10MB 限制') {
          alert('圖片大小超過 10MB，無法上傳。請選擇較小的圖片。')
          // 從編輯器中移除超過大小限制的圖片
          if (editor) {
            const newContent = editor.getData().replace(`<img src="${base64String}">`, '')
            editor.setData(newContent)
          }
        }
      } finally {
        uploadingImages.current.delete(base64String)
      }
    },
    [editor]
  )
  const checkForImages = useCallback(
    (content) => {
      const parser = new DOMParser()
      const doc = parser.parseFromString(content, 'text/html')
      const images = doc.getElementsByTagName('img')

      Array.from(images).forEach((img) => {
        if (img.src.startsWith('data:image') && !uploadingImages.current.has(img.src)) {
          uploadImage(img.src)
        }
      })
    },
    [uploadImage]
  )
  // base64轉blob
  function b64toBlob(b64Data, contentType = 'image/jpeg', sliceSize = 512) {
    const byteCharacters = atob(b64Data)
    const byteArrays = []

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize)
      const byteNumbers = new Array(slice.length)
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }

    return new Blob(byteArrays, { type: contentType })
  }

  // 內容改變偵測
  const [editorContent, setEditorContent] = useState('')
  const debouncedCheckForImages = useCallback(debounce(checkForImages, 300), [checkForImages])
  const handleEditorChange = useCallback(
    (event, editor) => {
      const data = editor.getData()
      setEditorContent(data)
      setFormData((prevState) => ({
        ...prevState,
        eventDesc: data
      }))

      debouncedCheckForImages(data)
    },
    [debouncedCheckForImages]
  )
  // $(function () {
  //   $('.tabs').tabs()
  //   $('.tabBtn').on('click', function () {
  //     // console.log(this)
  //     $('.tabBtn').removeClass('active')
  //     $(this).addClass('active')
  //   })
  // })

  // // 圖片上傳
  // $('#prdPic').on('change', function () {
  //   // console.log($(this).prop('files'))
  //   $('#fileChosen').text($(this).prop('files')[0].name)
  // })

  // $('#priceSingle').css('display', 'none') // 預設
  // $('#eventPlace').on('change', function () {
  //   if ($('#eventPlace').val() == 1) {
  //     // 對號座顯示
  //     $('#priceSingle').css('display', 'none')
  //     $('#priceMulti').css('display', 'flex')
  //   } else {
  //     // 單一區顯示
  //     $('#priceSingle').css('display', 'block')
  //     $('#priceMulti').css('display', 'none')
  //   }
  // })

  return (
    <div class='main'>
      <div class='pageTitle'>新增活動</div>
      <form action='' id='eventForm' enctype='multipart/form-data'>
        <div class='tabs'>
          <ul class='tabBtnList'>
            <li>
              <a href='#eventIntro' id='defaultOpen' class='tabBtn active'>
                活動資訊
              </a>
            </li>
            <li>
              <a href='#eventInfo' class='tabBtn'>
                活動介紹
              </a>
            </li>
          </ul>

          {/* tabContent 商品資訊 */}
          <div id='eventIntro' class='tabContent'>
            <div class='infoItem'>
              <label for='eventName' class='editTitle'>
                活動名稱：
              </label>
              <input id='eventName' name='eventName' type='text' required />
            </div>
            <div class='infoItem'>
              <label class='editTitle'>主要圖片：</label>
              <div class='picItem'>
                <label for='eventPic' class='custUpload'>
                  <i class='fa-solid fa-upload' /> 上傳圖片
                </label>
                <input
                  id='eventPic'
                  name='eventPic'
                  class='fileInput'
                  type='file'
                  required
                  accept='image/png, image/jpeg'
                />
                <span id='fileChosen'>未選擇任何檔案</span>
              </div>
            </div>
            <div class='infoItem'>
              <label for='eventSort' class='editTitle'>
                商品分類：
              </label>
              <select name='eventSort' id='eventSort'>
                <option value='dj'>刷碟 Disc Jockey</option>
                <option value='graffiti'>塗鴉 Graffiti</option>
                <option value='rap'>饒舌 Rap</option>
                <option value='streetDance'>街舞 Street Dance</option>
                <option value='skate'>滑板 Skate</option>
              </select>
            </div>
            <div class='infoItem'>
              <label for='launchDate' class='editTitle'>
                活動上架時間：
              </label>
              <input id='launchDate' name='launchDate' type='datetime-local' required />
            </div>
            <div class='infoItem itemflexList'>
              <div>
                <label for='eventSell' class='editTitle'>
                  活動開賣時間：
                </label>
                <input id='eventSell' name='eventSell' type='datetime-local' required />
              </div>
              <div>
                <label for='eventStart' class='editTitle'>
                  活動開始時間：
                </label>
                <input id='eventStart' name='eventStart' type='datetime-local' required />
              </div>
            </div>
            <div class='infoItem'>
              <label for='eventPlace' class='editTitle'>
                活動場館：
              </label>
              <select name='eventPlace' id='eventPlace'>
                <option value='1'>室內-對號入座</option>
                <option value='0'>戶外-自由座</option>
              </select>
            </div>
            <div id='priceMulti' class='flex multiSect'>
              <div class='infoList'>
                <label for='eventPrice_multi' class='editTitle'>
                  活動票價：
                </label>
                <div class='descInfo'>
                  <div class='descItem'>
                    <label for='sec1Price' class='editTitle'>
                      1F搖滾區：
                    </label>
                    <div class='itemPrice'>
                      <span class='priceMark event'>NT$</span>
                      <input id='sec1Price' name='sec1Price' type='number' min='0' step='1' required />
                    </div>
                  </div>
                  <div class='descItem'>
                    <label for='sec2Price' class='editTitle'>
                      2F坐席區：
                    </label>
                    <div class='itemPrice'>
                      <span class='priceMark event'>NT$</span>
                      <input id='sec2Price' name='sec2Price' type='number' min='0' required />
                    </div>
                  </div>
                  <div class='descItem'>
                    <label for='sec3Price' class='editTitle'>
                      2F站席區：
                    </label>
                    <div class='itemPrice'>
                      <span class='priceMark event'>NT$</span>
                      <input id='sec3Price' type='number' min='0' required />
                    </div>
                  </div>
                  <div class='descItem'>
                    <label for='sec4Price' class='editTitle'>
                      1F身障區：
                    </label>
                    <div class='itemPrice'>
                      <span class='priceMark event'>NT$</span>
                      <input id='sec4Price' type='number' min='0' required />
                    </div>
                  </div>
                </div>
              </div>
              <div id='stockMulti' class='infoList'>
                <label for='eventPrice_multi' class='editTitle'>
                  票券庫存：
                </label>
                <div class='descInfo'>
                  <div class='descItem'>
                    <label for='sec1Stock' class='editTitle'>
                      1F搖滾區：
                    </label>
                    <input id='sec1Stock' class='tktStock' name='sec1Stock' type='number' min='0' step='1' required />
                  </div>
                  <div class='descItem'>
                    <label for='sec2Stock' class='editTitle'>
                      2F坐席區：
                    </label>
                    <input id='sec2Stock' class='tktStock' name='sec2Stock' type='number' min='0' step='1' required />
                  </div>
                  <div class='descItem'>
                    <label for='sec3Stock' class='editTitle'>
                      2F站席區：
                    </label>
                    <input id='sec3Stock' class='tktStock' name='sec3Stock' type='number' min='0' step='1' required />
                  </div>
                  <div class='descItem'>
                    <label for='sec4Stock' class='editTitle'>
                      1F身障區：
                    </label>
                    <input id='sec4Stock' class='tktStock' name='sec4Stock' type='number' min='0' step='1' required />
                  </div>
                </div>
              </div>
            </div>
            <div id='priceSingle'>
              <div class='infoItem'>
                <label for='eventPrice_single' class='editTitle'>
                  活動票價：
                </label>
                <div class='itemPrice'>
                  <span class='priceMark event'>NT$</span>
                  <input id='eventPrice_single' type='number' min='0' required />
                </div>
              </div>
              <div class='infoItem'>
                <label for='eventSingleStock' class='editTitle'>
                  票券庫存：
                </label>
                <input id='secSingleStock' name='secSingleStock' type='number' min='0' step='1' required />
              </div>
            </div>
          </div>

          {/* tabContent 活動介紹 */}
          <div id='eventInfo' class='tabContent'>
            <div class='infoItem'>
              <label class='editTitle'>介紹圖片：</label>
              <div class='picItem'>
                <label for='eventInfoPic' class='custUpload'>
                  <i class='fa-solid fa-upload'></i>
                  上傳圖片
                </label>
                <input
                  id='eventInfoPic'
                  name='eventInfoPic'
                  class='fileInput'
                  type='file'
                  accept='image/png, image/jpeg'
                />
                <span id='infoPicsChosen' class='fileChosen'>
                  未選擇任何檔案
                </span>
              </div>
            </div>
            <div class='introItem'>
              <label for='eventDesc' class='editTitle'>
                活動介紹：
              </label>
              <div class='itemInfo'>
                <textarea name='eventDesc' id='eventDesc' placeholder='活動介紹' required></textarea>
              </div>
            </div>
            <div class='introItem'>
              <label for='eventAnnoc' class='editTitle'>
                最新公告：
              </label>
              <div class='itemInfo'>
                <textarea name='eventAnnoc' id='eventAnnoc' placeholder='最新公告'></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class='btnList flex'>
          <button className='btn' onClick={() => navigate(-1)}>
            <i class='fa-solid fa-angle-left'></i> 返回
          </button>
          <button class='btn' type='submit'>
            <i class='fa-solid fa-floppy-disk'></i> 儲存
          </button>
        </div>
      </form>
    </div>
  )
}

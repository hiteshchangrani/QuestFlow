const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    cb(null, 'uploads/');
  },
  filename:  (req, file, cb) =>{
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});


const fileFilter = (req, file, cb) => {
   const alloedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
   if(alloedTypes.includes(file.mimetype)){
      cb(null, true);
   } else {
      cb(new Error('Invalid file type, only JPEG JPG PNG are allowed!'), false);
   }
};

const upload = multer({ 
  storage,
  fileFilter
});

module.exports = upload;

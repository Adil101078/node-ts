// import '@core/declarations';
// import aws from 'aws-sdk'

// class awsS3Helper {
//   s3: aws.S3;
//   signedUrlExpireSeconds = 60 * 5;
//   constructor() {
//     this.s3 = new aws.S3({
//       accessKeyId: App.Config.AWS.ACCESS_KEY,
//       secretAccessKey: App.Config.AWS.SECRET_KEY,
//     });
//   }

//   /**
//      * This function is used to upload file to s3 bucket
//      * @param fileData 
//      * @param folderName 
//      * @param fileName 
//      * @param fileExtension 
//      * @param bucket 
//      * @param isPublic 
//      * @returns 
//      */
//   fileUpload = async (fileData: Buffer, folderName: string, fileName: string, fileExtension: string,
//     bucket = App.Config.AWS.S3_BUCKET_NAME, isPublic = false) => {
//     const data = new Promise(async (resolve) => {
//       try {
//         const params = {
//           Bucket: bucket,
//           Key: folderName + '/' + fileName,
//           Body: fileData,
//           ContentType: fileExtension,
//           ACL: null || '',
//         };
//         if (isPublic) {
//           params.ACL = 'public-read';
//         }
//         await this.s3.upload(params, (err: Error, data: any) => {
//           if (err) {
//             console.log('err', err);
//             resolve({ success: false, data: {Key: ''} });
//           }
//           resolve({ success: true, data });
//         });
//       } catch (error) {
//         console.log('error', error);
//         resolve({ success: false, data: {Key: ''} });
//       }
//     }).then(data => {
//       return data || {data: {Key: ''}, success: false};
//     });
//     return data;
//   };

//   /* getFileUrl
//     * get file url from path
//     * @param {string} filePath from where function calls
//     * @return {string}  Return Response.
//     */
//   getFileUrl = async (filePath: string, AWSS3Bucket: string) => {
//     return new Promise(async (resolve, reject) => {
//       try {
//         const params = {
//           Bucket: AWSS3Bucket,
//           Key: filePath,
//           Expires: this.signedUrlExpireSeconds,
//         };
//         const url = this.s3.getSignedUrl('getObject', params);
//         resolve(url);
//       } catch (error) {
//         reject(new Error('Something went wrong'));
//       }
//     });
//   };

//   /* getFileUrlSync
//     * get file url from path
//     * @param {string} filePath from where function calls
//     * @return {string}  Return Response.
//     */
//   getFileUrlSync = (filePath: string, AWSS3Bucket: string) => {
//     try {
//       const params = {
//         Bucket: AWSS3Bucket,
//         Key: filePath,
//         Expires: this.signedUrlExpireSeconds
//       };
//       return this.s3.getSignedUrl('getObject', params);
//     } catch (error) {
//       return error;
//     }
//   };

//   /* getAllFileFromDir
//        * get all files with path from selected directory
//        * @param {string} dirPath from where function calls
//        * @return {Object} json Return Response.
//        */
//   getAllFileFromDir = async (dirPath: string) => {
//     return new Promise(async (resolve, reject) => {
//       try {
//         const params = {
//           Bucket: App.Config.AWS.S3_BUCKET_NAME,
//           Delimiter: '/',
//           Prefix: dirPath + '/',
//         };
//         const imgObject = <any>[];
//         await this.s3.listObjectsV2(params, (err: Error, data: any) => {
//           if (err) {
//             reject(err);
//           }
//           if (data) {
//             for (
//               let index = 1;
//               index < data['Contents'].length;
//               index++
//             ) {
//               if (data['Contents'][index]['Size'] > 0) {
//                 imgObject[index] =
//                                     data['Contents'][index]['Key'];
//               }
//             }
//           }
//           resolve(imgObject);
//         });
//       } catch (error) {
//         reject(new Error('Something went wrong, server error'));
//       }
//     });
//   };
//     /* getFileUrl
//        * get file url from path
//        * @param {string} filePath from where function calls
//        * @return {string}  Return Response.
//        */
//   deleteFileFromPath= (fileKey: string) => {
//     try {
//       this.s3.deleteObject({
//         Bucket: App.Config.AWS.S3_BUCKET_NAME,
//         Key: fileKey
//       }, function (err, metadata) {
//         if(err) return false;
//         return metadata;
//       });
//     } catch (error) {
//       return false;
//     }
//   };
// }

// export default new awsS3Helper();


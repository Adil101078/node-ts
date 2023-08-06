import constant from '@core/constants'
import '@core/declarations'
import { Schema, model as Model } from 'mongoose'

type RoadMap = {
    startDate: Date;
    endDate: Date;
    title: string;
    description: string;
    status: string
}
type Gallery = {
    key: string,
    url: string
}
type fileType = {
    contentType: string;
    key: string;
    url: string;
    sizeInMegaByte: number;
    createdAt: Date
}
const fileTypeSchema = new Schema({
    contentType: {
        type: String,
      },
      key: { type: String },
      url: { type: String },
      sizeInMegaByte: Number,
      createdAt: { type: Date, default: Date.now() },
      status: String
})
const roadMapSchema = new Schema({
    name: String,
    description: String,
    date: Date,
    status: String
})

export interface I_Project {
    projectCode: string;
    title: string;
    country: string;
    creditingStartDate: Date;
    creditingEndDate: Date;
    methodology: string;
    standard: string;
    programStandard: string;
    overview: string;
    description: string;
    documents: any;
    carbonCreditPrice: number;
    totalCarbonCredits: number;
    vintage: number;
    sector: string;
    location: string;
    highlights: string;
    roadMap: Array<RoadMap>;
    gallery: Array<Gallery>
    status: string;

}

const ProjectSchema = new Schema({
    projectCode:{ type: String },
    title: { type: String, required: true },
    description: { type: String },
    overview: { type: String },
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: []
    },
    status: {
        type: String,
        enum: constant.PROJECT_STATUS,
        default: constant.PROJECT_STATUS[0]
    },
    images:{
        list:{
            type: [fileTypeSchema],
            default: [],
        },
        defaultImage: Number // Integer index in array of images, viz. `images.list`.
    },
    documents:{
        description: fileTypeSchema,
        ownership: fileTypeSchema,
        others:[fileTypeSchema],
        monitoringReport: fileTypeSchema,
        operationalData: fileTypeSchema
    },
    roadMap:{
        type: roadMapSchema,
        default: []
    }

},{
    timestamps: true,
    versionKey: false
})
const ProjectModel = Model(constant.MODELS.PROJECT, ProjectSchema)
export default ProjectModel
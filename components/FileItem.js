import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import ListItemText from "@material-ui/core/ListItemText";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TextField } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CodeEditor from "./CodeEditor";
import Link from 'next/link'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));
const FileItem = (props) => {
    const classes = useStyles();
    const codeString = `const ReportsView = (props) => {
    const classes = useStyles();
    const [gloablState, gloablDispatch] = useContext(GlobalStateContext);
    const [report,setReport] = useState([]);
    const [reportId,set_ReportId] = useState(props.match?.params?.id??false);
    const [mainImage,set_mainImage] = useState(false);
    const [details,setDetails] = useState("");
    const [images,setImages] = useState([]);
    const [segments,setSegments] = useState([]);
    const [formatedSegments,set_formatedSegments] = useState([]);
    const [peopleInCharge, set_peopleInCharge] = useState([]);
    const {appAjaxRequest} = useAjaxRequest();
    const history = useHistory();

    useEffect(() => {

        const axiosObject = {
            url: \`/api/reports/$\{reportId\}\`,
            method: "GET"
        };
        appAjaxRequest(axiosObject)
            .then(response => {
                setReport(response.data);
                setSegments(response.data?.segments);
                set_mainImage(response.data.image);
                setDetails(response.data.details);
                setImages(response.data.images);
                set_peopleInCharge(response.data?.people ?? []);
                let formated = response.data.segments.map((segment,index) =>{
                                segment.index = index + 1;
                                segment.questions.map((question,index) => {
                                            question.index = index +1;
                                            question.valid = "";
                                            question.invalid = "";
                                            question.irrelevant = "";
                                            switch(question.answer){
                                                case 1: question.valid = "+";break;
                                                case 2: question.invalid = "+";break;
                                                case 3: question.irrelevant = "+";break;
                                            }
                                            return question;
                                },[]);
                                return segment;
                },[]);

                set_formatedSegments(formated);
            })
            .catch(error => {
                console.log(error.response);

            });


    }, []);



    return (
        <>
            <BreadcrumbsNav value="home:reports:view" />
            <SubMenu value="reports" highlight="reports" />
            <ContentLayout>
                <div className="bottomGap10">
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<PictureAsPdf />}
                        size="large"
                        onClick={() => {
                            downloadPDF(report,formatedSegments)
                        }}
                        className="bottomGap"
                    >ייצוא דו"ח</Button>
                </div>
                <ContentLayoutBoxWrap removeHeadline>

                    <div style={{textAlign:'center',marginBottom:40}}>
                        <Typography variant="h4">ביקורת בטיחות בעבודה באתר</Typography>
                        <Typography variant="h5">{report.title} | {Moment(new Date(report.report_date), 'LLLL', 'he').format('[יום] dddd, Do [ב]MMMM YYYY')}</Typography>
                        <Typography variant="h6">ממלא הדו"ח: {report.reporter} </Typography>
                    </div>
                    <div className={classes.heading}>
                        <Typography variant="h6">פרטי הביקורת</Typography>
                    </div>
                    <ContentLayoutFlex className="justifySpace">
                        <div className={classes.flexItems}>
                            {details}
                        </div>
                        <div className={classes.flexItems} style={{width:'100%'}}>
                            <img src={mainImage} alt="" height={100}/>
                        </div>
                    </ContentLayoutFlex>

                    <div className={classes.heading}>
                        <Typography variant="h6">כללי - הערות לדוח נוכחי</Typography>
                    </div>
                    <BasicTable
                        className="general-notes-table"
                        headers={["הגורם המנהל באתר","שם","הערות/הסמכה"]}
                        rowSizes={['25%','25%','50%']}
                        rowAlign={['center','center','left']}
                        rowFields={["position","name","notes"]}
                        rows={peopleInCharge}
                        onlyView
                    />
                    <div style={{textAlign:'center',marginBottom:40}}></div>
                    {formatedSegments.map((segment, index) => {
                        return (
                            <>
                                <div className={classes.heading}>
                                    <Typography variant="h6">{segment.title}</Typography>
                                </div>
                                <BasicTable
                                            className="testQuestions"
                                            headers={["מס", "נושא נבדק", "תקין", "לא תקין", "לא רלוונטי", "הערות"]}
                                            rowSizes={['5%','38%','5%','7%','7%','38%']}
                                            rowAlign={['center','left','center','center','center','left']}
                                            rowFields={["index","question","valid","invalid","irrelevant","notes"]}
                                            rows={segment.questions}
                                            onlyView
                                            key={'question-' + segment.id}
                                            />
                                <div style={{textAlign:'center',marginBottom:40}}></div>
                            </>

                        )
                    })}
                    <ContentLayoutFlex className={classes.flexWrap}>
                        {images.map((image, index) => {
                            return (
                                <>
                                    <div className="image-upload-wrapper">
                                        <div>{image.name}</div>
                                        <div>
                                            <img src={image.path}  height="100"/>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </ContentLayoutFlex>

                </ContentLayoutBoxWrap>
            </ContentLayout>
        </>
    )
}

export default ReportsView;`;

    return (
        <ListItem>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                <Typography className={classes.heading}>{props.file}.</Typography>
                    <ListItemAvatar>
                        <Avatar>
                            <ImageIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                </AccordionSummary>
                <AccordionDetails>
                    <CodeEditor  content={codeString} />
                </AccordionDetails>
            </Accordion>
        </ListItem>
    );

};

export default FileItem;



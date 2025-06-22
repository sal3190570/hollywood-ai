"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import { useTheme } from "@mui/material/styles";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    marginBottom: theme.spacing(2),
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "1.2rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row",
  padding: theme.spacing(2, 1),
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
      transform: "rotate(90deg)",
    },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(2),
    fontSize: "1.1rem",
  },
}));

export default function PlansAccordion() {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const theme = useTheme();

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div className="ml-8 moving-marginLeft">
      <div
        className="flex flex-col justify-center w-[91%] max-w-[1110px] pb-10"
        style={{ marginTop: theme.spacing(4) }}
      >
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography component="span" sx={{ fontSize: "1.2rem" }}>
              What is Hollywood AI?
            </Typography>
          </AccordionSummary>
          <Fade in={expanded === "panel1"} timeout={500}>
            <div
              style={{
                padding: theme.spacing(0, 5, 3, 3),
                fontSize: "1.1rem",
              }}
              className="text-gray-400"
            >
              <Typography sx={{ fontSize: "1.1rem", color: "text.secondary" }}>
                HollywoodAI is designed to help you get high-quality summaries
                of your favourite movies instantly, without breaking a sweat.
                With our intuitive interface and powerful features, you can
                easily digest any movie in just minutes instead of hours.
              </Typography>
            </div>
          </Fade>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography component="span" sx={{ fontSize: "1.2rem" }}>
              How much does Hollywood AI cost?
            </Typography>
          </AccordionSummary>
          <Fade in={expanded === "panel2"} timeout={500}>
            <div
              style={{
                padding: theme.spacing(0, 5, 3, 3),
                fontSize: "1.1rem",
              }}
              className="text-gray-400"
            >
              <Typography sx={{ fontSize: "1.1rem", color: "text.secondary" }}>
                Get summaries of your favourite movies on your smartphone,
                tablet or laptop, all for one fixed monthly or yearly fee. Plans
                range from $19 per month to $190 per year. No extra costs, no
                contracts.
              </Typography>
            </div>
          </Fade>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography component="span" sx={{ fontSize: "1.2rem" }}>
              What can I watch on Hollywood AI?
            </Typography>
          </AccordionSummary>
          <Fade in={expanded === "panel3"} timeout={500}>
            <div
              style={{
                padding: theme.spacing(0, 5, 3, 3),
                fontSize: "1.1rem",
              }}
              className="text-gray-400"
            >
              <Typography sx={{ fontSize: "1.1rem", color: "text.secondary" }}>
                Hollywood AI has an extensive library of feature films. Watch as
                much as you want, at any time that you want.
              </Typography>
            </div>
          </Fade>
        </Accordion>
      </div>
    </div>
  );
}

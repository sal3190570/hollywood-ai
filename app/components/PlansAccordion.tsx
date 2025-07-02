"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 16,
  "&:not(:last-child)": {
    marginBottom: theme.spacing(2),
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <AddIcon
        sx={{
          fontSize: "1.4rem",
          transition: "transform 0.2s",
        }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row",
  padding: theme.spacing(2, 1),
  [`& .${accordionSummaryClasses.expandIconWrapper}`]: {
    transition: "transform 0.2s",
  },
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
      transform: "rotate(45deg)",
    },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(2),
    fontSize: "1.1rem",
  },
}));

function FadeContent({
  show,
  children,
  style,
}: {
  show: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  // This component adds a smooth opacity transition to the content.
  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transition: "opacity 700ms cubic-bezier(0.4, 0, 0.2, 1)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

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
          TransitionProps={{ timeout: 700 }}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography component="span" sx={{ fontSize: "1.2rem" }}>
              What is Hollywood AI?
            </Typography>
          </AccordionSummary>
          <FadeContent
            show={expanded === "panel1"}
            style={{
              padding: theme.spacing(0, 5, 3, 3),
              fontSize: "1.1rem",
              color: theme.palette.text.secondary,
            }}
          >
            <Typography sx={{ fontSize: "1.1rem", color: "text.secondary" }}>
              HollywoodAI is designed to help you get high-quality summaries of
              your favourite movies instantly, without breaking a sweat. With
              our intuitive interface and powerful features, you can easily
              digest any movie in just minutes instead of hours.
            </Typography>
          </FadeContent>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          TransitionProps={{ timeout: 700 }}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography component="span" sx={{ fontSize: "1.2rem" }}>
              How much does Hollywood AI cost?
            </Typography>
          </AccordionSummary>
          <FadeContent
            show={expanded === "panel2"}
            style={{
              padding: theme.spacing(0, 5, 3, 3),
              fontSize: "1.1rem",
              color: theme.palette.text.secondary,
            }}
          >
            <Typography sx={{ fontSize: "1.1rem", color: "text.secondary" }}>
              Get summaries of your favourite movies on your smartphone, tablet
              or laptop, all for one fixed monthly or yearly fee. Plans range
              from $19 per month to $190 per year. No extra costs, no contracts.
            </Typography>
          </FadeContent>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          TransitionProps={{ timeout: 700 }}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography component="span" sx={{ fontSize: "1.2rem" }}>
              What can I watch on Hollywood AI?
            </Typography>
          </AccordionSummary>
          <FadeContent
            show={expanded === "panel3"}
            style={{
              padding: theme.spacing(0, 5, 3, 3),
              fontSize: "1.1rem",
              color: theme.palette.text.secondary,
            }}
          >
            <Typography sx={{ fontSize: "1.1rem", color: "text.secondary" }}>
              Hollywood AI has an extensive library of feature films. Watch as
              much as you want, at any time that you want.
            </Typography>
          </FadeContent>
        </Accordion>
      </div>
    </div>
  );
}

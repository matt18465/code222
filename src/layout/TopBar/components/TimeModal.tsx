import { Box, Button, IconButton, Typography, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { subMonths, subWeeks, subDays, subHours } from "date-fns";
import { DateTime } from "luxon";

import { useThemeContext } from "../../../state/theme-context";
import { useAppStore } from "../../../store/appStore";
import { CloseIcon } from "../../../assets/icons/customIcons";
import { useState } from "react";

const buttonTypes = [
  "4 Hours",
  "24 Hours",
  "1 Week",
  "2 Weeks",
  "1 Month",
  "2 Months",
  "3 Months",
  "6 Months",
];

export const TimeModal = () => {
  const toggleTimeModalVisibility = useAppStore(
    (state) => state.toggleTimeModalVisibility
  );
  const { mode } = useThemeContext();
  const {
    startDate: initialStartDate,
    endDate: initialEndDate,
    setTimeRange,
  } = useAppStore((state) => ({
    startDate: state.startDate,
    endDate: state.endDate,
    setTimeRange: state.setTimeRange,
  }));

  const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate);

  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleClose = () => {
    toggleTimeModalVisibility();
  };

  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleTimeButtonClick = (type: string) => {
    setActiveButton(type);
    const now = new Date();
    let start: Date | null = null;

    switch (type) {
      case "4 Hours":
        start = subHours(now, 4);
        break;
      case "24 Hours":
        start = subDays(now, 1);
        break;
      case "1 Week":
        start = subWeeks(now, 1);
        break;
      case "2 Weeks":
        start = subWeeks(now, 2);
        break;
      case "1 Month":
        start = subMonths(now, 1);
        break;
      case "2 Months":
        start = subMonths(now, 2);
        break;
      case "3 Months":
        start = subMonths(now, 3);
        break;
      case "6 Months":
        start = subMonths(now, 6);
        break;
      default:
        break;
    }

    setStartDate(start);
    setEndDate(now);
    setTimeRange(start, now);
  };

  const checkActiveButton = (start: Date | null, end: Date | null) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endDate = new Date(end || "");
    endDate.setHours(0, 0, 0, 0);

    if (
      start instanceof Date &&
      end instanceof Date &&
      endDate.getTime() === today.getTime()
    ) {
      const timeDiff = Math.abs(end.getTime() - start.getTime());

      const tolerance = 1000 * 60 * 5; // 5 minutes
      let buttonToActivate = null;

      const timeDiffs = {
        "4 Hours": 4 * 60 * 60 * 1000,
        "24 Hours": 24 * 60 * 60 * 1000,
        "1 Week": Math.abs(today.getTime() - subWeeks(today, 1).getTime()),
        "2 Weeks": Math.abs(today.getTime() - subWeeks(today, 2).getTime()),
        "1 Month": Math.abs(today.getTime() - subMonths(today, 1).getTime()),
        "2 Months": Math.abs(today.getTime() - subMonths(today, 2).getTime()),
        "3 Months": Math.abs(today.getTime() - subMonths(today, 3).getTime()),
        "6 Months": Math.abs(today.getTime() - subMonths(today, 6).getTime()),
      };

      for (const [buttonLabel, buttonTime] of Object.entries(timeDiffs)) {
        if (Math.abs(timeDiff - buttonTime) <= tolerance) {
          buttonToActivate = buttonLabel;
          break;
        }
      }

      console.log(buttonToActivate);
      setActiveButton(buttonToActivate);
    } else {
      console.warn("Either start or end date is not a valid Date object");
      setActiveButton(null);
    }
  };

  const handleStartDateChange = (newValue: DateTime | null) => {
    if (newValue && newValue.isValid) {
      const nativeDate = newValue.toJSDate();
      setStartDate(nativeDate);
      setTimeRange(nativeDate, endDate);
      checkActiveButton(nativeDate, endDate);
    } else {
      setStartDate(null);
      setTimeRange(null, endDate);
      checkActiveButton(null, endDate);
    }
  };

  const handleEndDateChange = (newValue: DateTime | null) => {
    if (newValue && newValue.isValid) {
      const nativeDate = newValue.toJSDate();
      setEndDate(nativeDate);
      setTimeRange(startDate, nativeDate);
      checkActiveButton(startDate, nativeDate);
    } else {
      setEndDate(null);
      setTimeRange(startDate, null);
      checkActiveButton(startDate, null);
    }
  };

  return (
    <Box
      onClick={handleBackdropClick}
      sx={{
        position: "fixed",
        backgroundColor: "rgb(0,0,0,0.4)",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "9992",
      }}
    >
      <Box
        sx={{
          width: "35rem",
          height: "28.5rem",
          backgroundColor: mode === "dark" ? "#43474f" : "white",
          padding: "3rem",
          paddingTop: "2.2rem",
          borderRadius: "10px",
          position: "relative",
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: "2rem",
            right: "2rem",
          }}
        >
          <CloseIcon
            sx={{
              fontSize: "2rem",
            }}
          />
        </IconButton>
        <Typography fontSize="1.6rem" color="text.primary">
          Time range
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "2.5rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              gap: "0.7rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
                width: "100%",
                flexWrap: "wrap",
                justifyContent: "space-between",
                "& button": {
                  width: "22%",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderRadius: "8px",
                  color: "text.primary",
                  textTransform: "none",
                  "& .MuiTouchRipple-child": {
                    backgroundColor: "rgba(144, 202, 249, 0.26)",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(144, 202, 249, 0.08)",
                  },
                },
              }}
            >
              {buttonTypes.slice(0, 4).map((type) => (
                <Button
                  key={type}
                  onClick={() => handleTimeButtonClick(type)}
                  sx={{
                    borderColor: (theme) =>
                      activeButton === type
                        ? "rgb(124, 117, 236)"
                        : "outlinedButtonBorder",
                    backgroundColor: (theme) =>
                      activeButton === type ? "rgba(144, 202, 249, 0.08)" : "",
                  }}
                >
                  {type}
                </Button>
              ))}
              {buttonTypes.slice(4).map((type) => (
                <Button
                  key={type}
                  onClick={() => handleTimeButtonClick(type)}
                  sx={{
                    borderColor: (theme) =>
                      activeButton === type
                        ? "rgb(124, 117, 236)"
                        : "outlinedButtonBorder",
                    backgroundColor: (theme) =>
                      activeButton === type ? "rgba(144, 202, 249, 0.08)" : "",
                  }}
                >
                  {type}
                </Button>
              ))}
            </Box>
          </Box>
          <Box sx={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
            <DateTimePicker
              label="Start Date"
              value={startDate}
              onChange={handleStartDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
            <DateTimePicker
              label="End Date"
              value={endDate}
              onChange={handleEndDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              marginTop: "2rem",
            }}
          >
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                width: "14rem",
                height: "2.6rem",
                backgroundColor: "rgb(105, 99, 204)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgb(124, 119, 213)",
                },
              }}
              onClick={handleClose}
            >
              Accept
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

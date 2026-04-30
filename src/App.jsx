import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { supabase } from "./supabase";

function App() {
  const [screen, setScreen] = useState("dashboard");

  return (
    <div
      style={{
        maxWidth: "390px",
        margin: "0 auto",
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {screen === "dashboard" && <Dashboard onNavigate={setScreen} />}
      {screen === "log" && <LogWalk onNavigate={setScreen} />}
      {screen === "analytics" && <Analytics onNavigate={setScreen} />}
    </div>
  );
}

function Dashboard({ onNavigate }) {
  const [walks, setWalks] = useState([]);

  useEffect(() => {
    const fetchWalks = async () => {
      const { data, error } = await supabase
        .from("walks")
        .select("*")
        .order("date", { ascending: false });
      if (!error) setWalks(data);
    };
    fetchWalks();
  }, []);

  const thisWeekWalks = walks.filter((w) => {
    const walkDate = new Date(w.date);
    const now = new Date();
    const weekAgo = new Date(now.setDate(now.getDate() - 7));
    return walkDate >= weekAgo;
  });

  const totalMinutes = thisWeekWalks.reduce((sum, w) => {
    if (!w.start_time || !w.end_time) return sum;
    const [sh, sm] = w.start_time.split(":").map(Number);
    const [eh, em] = w.end_time.split(":").map(Number);
    return sum + (eh * 60 + em) - (sh * 60 + sm);
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const lastWalk = walks[0];

  return (
    <div
      style={{
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "11px",
              color: "#888",
              margin: 0,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Pawprints
          </p>
          <p style={{ fontSize: "18px", fontWeight: "500", margin: 0 }}>
            Good morning 🐾
          </p>
        </div>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "#f5f5f5",
            border: "0.5px solid #e0e0e0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
          }}
        >
          🐶
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          border: "0.5px solid #e0e0e0",
          padding: "20px",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            color: "#888",
            margin: "0 0 12px",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          This week
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          <div
            style={{
              background: "#f7f7f7",
              borderRadius: "8px",
              padding: "12px 14px",
            }}
          >
            <p style={{ fontSize: "11px", color: "#666", margin: "0 0 4px" }}>
              Walks
            </p>
            <p
              style={{
                fontSize: "28px",
                fontWeight: "500",
                margin: 0,
                lineHeight: 1,
              }}
            >
              {thisWeekWalks.length}
            </p>
          </div>
          <div
            style={{
              background: "#f7f7f7",
              borderRadius: "8px",
              padding: "12px 14px",
            }}
          >
            <p style={{ fontSize: "11px", color: "#666", margin: "0 0 4px" }}>
              Time out
            </p>
            <p
              style={{
                fontSize: "28px",
                fontWeight: "500",
                margin: 0,
                lineHeight: 1,
              }}
            >
              {hours}h {minutes}m
            </p>
          </div>
        </div>
        <div
          style={{
            marginTop: "16px",
            display: "flex",
            gap: "6px",
            alignItems: "flex-end",
            height: "48px",
          }}
        >
          {[60, 100, 40, 80, 70, 90, 30].map((h, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                background: i === 5 ? "#639922" : "#f0f0f0",
                borderRadius: "3px",
                height: `${h}%`,
              }}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "4px",
          }}
        >
          <p style={{ fontSize: "10px", color: "#aaa", margin: 0 }}>Mon</p>
          <p style={{ fontSize: "10px", color: "#aaa", margin: 0 }}>Sun</p>
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          border: "0.5px solid #e0e0e0",
          padding: "16px 20px",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            color: "#888",
            margin: "0 0 10px",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Last walk
        </p>
        {lastWalk ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p style={{ fontSize: "15px", fontWeight: "500", margin: 0 }}>
                {new Date(lastWalk.date).toLocaleDateString("en-GB", {
                  weekday: "long",
                  day: "numeric",
                  month: "short",
                })}
              </p>
              <p style={{ fontSize: "13px", color: "#666", margin: "4px 0 0" }}>
                {lastWalk.location || "No location set"}
              </p>
            </div>
            <div
              style={{
                background: "#EAF3DE",
                color: "#3B6D11",
                fontSize: "11px",
                fontWeight: "500",
                padding: "4px 10px",
                borderRadius: "8px",
              }}
            >
              {lastWalk.behaviour >= 4
                ? "Good girl"
                : lastWalk.behaviour >= 3
                  ? "Pretty good"
                  : "Bad doggy"}
            </div>
          </div>
        ) : (
          <p style={{ fontSize: "14px", color: "#aaa", margin: 0 }}>
            No walks logged yet
          </p>
        )}
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}
      >
        <button
          onClick={() => onNavigate("log")}
          style={{
            padding: "14px",
            fontSize: "14px",
            fontWeight: "500",
            borderRadius: "8px",
            border: "0.5px solid #ddd",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          + Log walk
        </button>
        <button
          onClick={() => onNavigate("analytics")}
          style={{
            padding: "14px",
            fontSize: "14px",
            borderRadius: "8px",
            border: "0.5px solid #ddd",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          Analytics
        </button>
      </div>
    </div>
  );
}

function LogWalk({ onNavigate }) {
  const [weather, setWeather] = useState(null);
  const [behaviour, setBehaviour] = useState(4);
  const [friends, setFriends] = useState([]);
  const [friendInput, setFriendInput] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("08:45");

  const saveWalk = async () => {
    const { error } = await supabase.from("walks").insert([
      {
        date: new Date().toISOString().split("T")[0],
        location,
        start_time: startTime,
        end_time: endTime,
        weather,
        behaviour,
        friends: friends.join(", "),
      },
    ]);
    if (error) {
      alert("Something went wrong: " + error.message);
    } else {
      onNavigate("dashboard");
    }
  };

  const behaviourLabels = {
    1: "Bad doggy 😈",
    2: "Could be better",
    3: "Pretty good",
    4: "Good girl",
    5: "Angel 🌟",
  };

  const addFriend = () => {
    if (friendInput.trim()) {
      setFriends([...friends, friendInput.trim()]);
      setFriendInput("");
    }
  };

  return (
    <div
      style={{
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button
          onClick={() => onNavigate("dashboard")}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: "0.5px solid #ddd",
            background: "#fff",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ←
        </button>
        <div>
          <p style={{ fontSize: "18px", fontWeight: "500", margin: 0 }}>
            Log a walk
          </p>
          <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>
            Today, Wednesday
          </p>
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          border: "0.5px solid #e0e0e0",
          padding: "16px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "11px",
              color: "#888",
              margin: "0 0 6px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Location
          </p>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Danesfield"
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: "15px",
              boxSizing: "border-box",
            }}
          />
          <div
            style={{
              marginTop: "8px",
              display: "flex",
              gap: "6px",
              flexWrap: "wrap",
            }}
          >
            {["Danesfield", "Astral Park", "FraserFields"].map((loc) => (
              <span
                key={loc}
                onClick={() => setLocation(loc)}
                style={{
                  fontSize: "12px",
                  color: "#3B6D11",
                  background: "#EAF3DE",
                  padding: "3px 10px",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
              >
                {loc}
              </span>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "0.5px solid #eee", paddingTop: "16px" }}>
          <p
            style={{
              fontSize: "11px",
              color: "#888",
              margin: "0 0 8px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Time
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px",
            }}
          >
            {["Start", "End"].map((label, i) => (
              <div
                key={label}
                style={{
                  background: "#f7f7f7",
                  borderRadius: "8px",
                  padding: "10px 12px",
                }}
              >
                <p
                  style={{ fontSize: "11px", color: "#888", margin: "0 0 2px" }}
                >
                  {label}
                </p>
                <input
                  type="time"
                  value={i === 0 ? startTime : endTime}
                  onChange={(e) =>
                    i === 0
                      ? setStartTime(e.target.value)
                      : setEndTime(e.target.value)
                  }
                  style={{
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontSize: "15px",
                    fontWeight: "500",
                    width: "100%",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "0.5px solid #eee", paddingTop: "16px" }}>
          <p
            style={{
              fontSize: "11px",
              color: "#888",
              margin: "0 0 8px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Weather
          </p>
          <div style={{ display: "flex", gap: "8px" }}>
            {[
              ["☀️", "Sunny"],
              ["⛅", "Cloudy"],
              ["🌧️", "Rainy"],
              ["❄️", "Cold"],
              ["💨", "Windy"],
            ].map(([icon, label]) => (
              <div
                key={label}
                onClick={() => setWeather(label)}
                style={{
                  flex: 1,
                  background: weather === label ? "#EAF3DE" : "#f7f7f7",
                  border:
                    weather === label
                      ? "1.5px solid #639922"
                      : "0.5px solid #e0e0e0",
                  borderRadius: "8px",
                  padding: "10px 4px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontSize: "20px" }}>{icon}</div>
                <p
                  style={{ fontSize: "11px", color: "#666", margin: "4px 0 0" }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          border: "0.5px solid #e0e0e0",
          padding: "16px 20px",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            color: "#888",
            margin: "0 0 12px",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Behaviour
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "6px",
          }}
        >
          <span style={{ fontSize: "12px", color: "#666" }}>Bad doggy 😈</span>
          <span style={{ fontSize: "12px", color: "#666" }}>Good girl 🌟</span>
        </div>
        <input
          type="range"
          min="1"
          max="5"
          value={behaviour}
          onChange={(e) => setBehaviour(Number(e.target.value))}
          style={{ width: "100%" }}
        />
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <span
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#3B6D11",
              background: "#EAF3DE",
              padding: "4px 14px",
              borderRadius: "20px",
            }}
          >
            {behaviourLabels[behaviour]}
          </span>
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          border: "0.5px solid #e0e0e0",
          padding: "16px 20px",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            color: "#888",
            margin: "0 0 10px",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Dog friends met
        </p>
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "10px",
          }}
        >
          {friends.map((f) => (
            <div
              key={f}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "#EAF3DE",
                borderRadius: "20px",
                padding: "4px 10px 4px 8px",
              }}
            >
              <span style={{ fontSize: "14px" }}>🐾</span>
              <span style={{ fontSize: "13px", color: "#3B6D11" }}>{f}</span>
              <span
                onClick={() => setFriends(friends.filter((x) => x !== f))}
                style={{
                  fontSize: "11px",
                  color: "#639922",
                  cursor: "pointer",
                  marginLeft: "2px",
                }}
              >
                ✕
              </span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            value={friendInput}
            onChange={(e) => setFriendInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addFriend()}
            placeholder="Add a dog friend..."
            style={{
              flex: 1,
              background: "#f7f7f7",
              border: "0.5px solid #e0e0e0",
              borderRadius: "8px",
              padding: "8px 12px",
              fontSize: "14px",
              outline: "none",
            }}
          />
          <button
            onClick={addFriend}
            style={{
              padding: "8px 14px",
              fontSize: "14px",
              borderRadius: "8px",
              border: "0.5px solid #ddd",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            + Add
          </button>
        </div>
      </div>

      <button
        onClick={saveWalk}
        style={{
          width: "100%",
          padding: "14px",
          fontSize: "15px",
          fontWeight: "500",
          borderRadius: "8px",
          background: "#3B6D11",
          color: "#EAF3DE",
          border: "none",
          cursor: "pointer",
        }}
      >
        Save walk
      </button>
    </div>
  );
}

function Analytics({ onNavigate }) {
  const [metric, setMetric] = useState("time");
  const [period, setPeriod] = useState("week");
  const [walks, setWalks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);

  useEffect(() => {
    const fetchWalks = async () => {
      const { data, error } = await supabase
        .from("walks")
        .select("*")
        .order("date", { ascending: true });
      if (!error) setWalks(data);
      setLoading(false);
    };
    fetchWalks();
  }, []);

  const getChartData = () => {
    if (period === "week") {
      const weeks = ["Wk 1", "Wk 2", "Wk 3", "Wk 4"];
      const vals = weeks.map((_, i) => {
        const weekWalks = walks.filter((w) => {
          const day = new Date(w.date).getDate();
          return day >= i * 7 + 1 && day <= (i + 1) * 7;
        });
        if (metric === "count") return weekWalks.length;
        return weekWalks.reduce((sum, w) => {
          if (!w.start_time || !w.end_time) return sum;
          const [sh, sm] = w.start_time.split(":").map(Number);
          const [eh, em] = w.end_time.split(":").map(Number);
          return sum + (eh * 60 + em) - (sh * 60 + sm);
        }, 0);
      });
      return { vals, labels: weeks };
    }

    if (period === "day") {
      const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const vals = dayNames.map((_, i) => {
        const dayWalks = walks.filter((w) => {
          const d = new Date(w.date).getDay();
          const adjusted = d === 0 ? 6 : d - 1;
          return adjusted === i;
        });
        if (metric === "count") return dayWalks.length;
        return dayWalks.reduce((sum, w) => {
          if (!w.start_time || !w.end_time) return sum;
          const [sh, sm] = w.start_time.split(":").map(Number);
          const [eh, em] = w.end_time.split(":").map(Number);
          return sum + (eh * 60 + em) - (sh * 60 + sm);
        }, 0);
      });
      return { vals, labels: dayNames };
    }

    if (period === "month") {
      const months = [...new Set(walks.map((w) => w.date.slice(0, 7)))];
      const vals = months.map((m) => {
        const monthWalks = walks.filter((w) => w.date.startsWith(m));
        if (metric === "count") return monthWalks.length;
        return monthWalks.reduce((sum, w) => {
          if (!w.start_time || !w.end_time) return sum;
          const [sh, sm] = w.start_time.split(":").map(Number);
          const [eh, em] = w.end_time.split(":").map(Number);
          return sum + (eh * 60 + em) - (sh * 60 + sm);
        }, 0);
      });
      return {
        vals,
        labels: months.map((m) =>
          new Date(m).toLocaleString("en-GB", { month: "short" }),
        ),
      };
    }
  };

  const generateSummary = async () => {
    setSummaryLoading(true);
    const walkSummary = walks.map((w) => ({
      date: w.date,
      location: w.location,
      duration: (() => {
        if (!w.start_time || !w.end_time) return null;
        const [sh, sm] = w.start_time.split(":").map(Number);
        const [eh, em] = w.end_time.split(":").map(Number);
        return eh * 60 + em - (sh * 60 + sm);
      })(),
      weather: w.weather,
      behaviour: w.behaviour,
      friends: w.friends,
    }));

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model: "claude-opus-4-5",
        max_tokens: 300,
        messages: [
          {
            role: "user",
            content: `You are a helpful dog walking assistant. Analyse this walk data and give 3 short, friendly, specific insights about patterns you notice. Focus on things like which locations lead to better behaviour, which dog friends have a positive or negative effect, how weather affects the walks, and any timing patterns. Be conversational and specific — mention actual location names and friend names from the data. Keep each insight to one sentence and keep each sentence under 15 words. Data: ${JSON.stringify(walkSummary)}`,
          },
        ],
      }),
    });

    const data = await response.json();
    setSummary(data.content[0].text);
    setSummaryLoading(false);
  };

  const chartData = walks.length
    ? getChartData()
    : { vals: [0], labels: ["-"] };
  const vals = chartData.vals;
  const max = Math.max(...vals) || 1;
  return (
    <div
      style={{
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button
          onClick={() => onNavigate("dashboard")}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: "0.5px solid #ddd",
            background: "#fff",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ←
        </button>
        <p style={{ fontSize: "18px", fontWeight: "500", margin: 0 }}>
          Analytics
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "6px" }}>
          {["day", "week", "month"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              style={{
                fontSize: "11px",
                padding: "4px 10px",
                borderRadius: "20px",
                border: period === p ? "none" : "0.5px solid #ddd",
                background: period === p ? "#3B6D11" : "#fff",
                color: period === p ? "#EAF3DE" : "#333",
                cursor: "pointer",
              }}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          {["time", "count"].map((m) => (
            <button
              key={m}
              onClick={() => setMetric(m)}
              style={{
                fontSize: "11px",
                padding: "4px 10px",
                borderRadius: "20px",
                border: metric === m ? "none" : "0.5px solid #ddd",
                background: metric === m ? "#3B6D11" : "#fff",
                color: metric === m ? "#EAF3DE" : "#333",
                cursor: "pointer",
              }}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          border: "0.5px solid #e0e0e0",
          padding: "16px 20px",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            color: "#888",
            margin: "0 0 12px",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {metric === "time" ? "Minutes" : "Walks"} per {period}
        </p>
        <div
          style={{
            display: "flex",
            gap: "6px",
            alignItems: "flex-end",
            height: "80px",
          }}
        >
          {vals.map((v, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  width: "100%",
                  background: v === max ? "#639922" : "#C0DD97",
                  borderRadius: "3px",
                  height: `${Math.round((v / max) * 100)}%`,
                }}
              />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
          {chartData.labels.map((l) => (
            <div
              key={l}
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: "10px",
                color: "#aaa",
              }}
            >
              {l}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}
      >
        <div
          style={{
            background: "#f7f7f7",
            borderRadius: "8px",
            padding: "12px 14px",
          }}
        >
          <p style={{ fontSize: "11px", color: "#666", margin: "0 0 4px" }}>
            Avg per {period}
          </p>
          <p style={{ fontSize: "20px", fontWeight: "500", margin: 0 }}>
            {metric === "time"
              ? (() => {
                  const avg = Math.round(
                    vals.filter((v) => v > 0).reduce((a, b) => a + b, 0) /
                      (vals.filter((v) => v > 0).length || 1),
                  );
                  return `${Math.floor(avg / 60)}h ${avg % 60}m`;
                })()
              : (vals.reduce((a, b) => a + b, 0) / (vals.length || 1)).toFixed(
                  1,
                )}
          </p>
        </div>
        <div
          style={{
            background: "#f7f7f7",
            borderRadius: "8px",
            padding: "12px 14px",
          }}
        >
          <p style={{ fontSize: "11px", color: "#666", margin: "0 0 4px" }}>
            Best {period}
          </p>
          <p style={{ fontSize: "20px", fontWeight: "500", margin: 0 }}>
            {metric === "time"
              ? (() => {
                  const best = Math.max(...vals);
                  return `${Math.floor(best / 60)}h ${best % 60}m`;
                })()
              : Math.max(...vals)}
          </p>
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          border: "0.5px solid #e0e0e0",
          padding: "16px 20px",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            color: "#888",
            margin: "0 0 14px",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Patterns
        </p>

        <p style={{ fontSize: "13px", fontWeight: "500", margin: "0 0 10px" }}>
          Behaviour by weather
        </p>
        <div
          style={{
            display: "flex",
            gap: "6px",
            alignItems: "flex-end",
            height: "48px",
          }}
        >
          {[
            ["☀️", "Sunny"],
            ["⛅", "Cloudy"],
            ["🌧️", "Rainy"],
            ["❄️", "Cold"],
            ["💨", "Windy"],
          ].map(([icon, weather]) => {
            const weatherWalks = walks.filter(
              (w) => w.weather === weather && w.behaviour,
            );
            const avg = weatherWalks.length
              ? weatherWalks.reduce((sum, w) => sum + w.behaviour, 0) /
                weatherWalks.length
              : 0;
            const h = Math.round((avg / 5) * 100);
            return (
              <div
                key={weather}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                  height: "100%",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    background: "#639922",
                    borderRadius: "3px",
                    height: `${h}%`,
                    opacity: 0.4 + (h / 100) * 0.6,
                  }}
                />
                <span style={{ fontSize: "12px" }}>{icon}</span>
              </div>
            );
          })}
        </div>

        <p
          style={{ fontSize: "13px", fontWeight: "500", margin: "16px 0 10px" }}
        >
          Behaviour by friend
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {(() => {
            const friendMap = {};
            walks.forEach((w) => {
              const friends = w.friends
                ? w.friends
                    .split(",")
                    .map((f) => f.trim())
                    .filter(Boolean)
                : [];
              if (friends.length === 0) {
                if (!friendMap["Solo"]) friendMap["Solo"] = [];
                friendMap["Solo"].push(w.behaviour);
              } else {
                friends.forEach((f) => {
                  if (!friendMap[f]) friendMap[f] = [];
                  friendMap[f].push(w.behaviour);
                });
              }
            });
            const maxAvg = Math.max(
              ...Object.values(friendMap).map(
                (arr) => arr.reduce((a, b) => a + b, 0) / arr.length,
              ),
            );
            return Object.entries(friendMap)
              .sort(
                (a, b) =>
                  b[1].reduce((x, y) => x + y, 0) / b[1].length -
                  a[1].reduce((x, y) => x + y, 0) / a[1].length,
              )
              .map(([name, scores]) => {
                const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
                const pct = Math.round((avg / maxAvg) * 100);
                return (
                  <div
                    key={name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{ fontSize: "12px", color: "#666", width: "52px" }}
                    >
                      {name}
                    </span>
                    <div
                      style={{
                        flex: 1,
                        background: "#f0f0f0",
                        borderRadius: "3px",
                        height: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: `${pct}%`,
                          background: "#639922",
                          borderRadius: "3px",
                          height: "100%",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#aaa",
                        width: "28px",
                        textAlign: "right",
                      }}
                    >
                      {avg.toFixed(1)}
                    </span>
                  </div>
                );
              });
          })()}
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          border: "0.5px solid #e0e0e0",
          padding: "16px 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              color: "#888",
              margin: 0,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            AI Summary
          </p>
          <button
            onClick={generateSummary}
            style={{
              fontSize: "12px",
              padding: "5px 12px",
              borderRadius: "20px",
              border: "0.5px solid #ddd",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            {summaryLoading ? "Thinking..." : "Generate"}
          </button>
        </div>
        {summary ? (
          <div style={{ fontSize: "14px", color: "#444", lineHeight: "1.6" }}>
            <ReactMarkdown>{summary}</ReactMarkdown>
          </div>
        ) : (
          <p style={{ fontSize: "13px", color: "#aaa", margin: 0 }}>
            Tap generate to get AI insights based on your walk data.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;

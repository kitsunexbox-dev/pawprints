import { useState } from "react";

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
              5
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
              5h 42m
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p style={{ fontSize: "15px", fontWeight: "500", margin: 0 }}>
              Today, 8:14am
            </p>
            <p style={{ fontSize: "13px", color: "#666", margin: "4px 0 0" }}>
              45 min · Hampstead Heath
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
            Good day
          </div>
        </div>
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
  const [friends, setFriends] = useState(["Biscuit", "Mochi"]);
  const [friendInput, setFriendInput] = useState("");

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
            placeholder="e.g. Hampstead Heath"
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
            {["Hampstead Heath", "Victoria Park", "Local streets"].map(
              (loc) => (
                <span
                  key={loc}
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
              ),
            )}
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
                  defaultValue={i === 0 ? "08:00" : "08:45"}
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

  const data = {
    time: {
      week: [312, 420, 380, 440],
      day: [42, 68, 0, 55, 71, 45, 30],
      month: [1400, 1620, 1380, 1710],
    },
    count: {
      week: [7, 9, 8, 10],
      day: [1, 2, 0, 1, 2, 1, 1],
      month: [30, 35, 32, 38],
    },
  };

  const labels = {
    week: ["Wk 1", "Wk 2", "Wk 3", "Wk 4"],
    day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    month: ["Jan", "Feb", "Mar", "Apr"],
  };

  const vals = data[metric][period];
  const max = Math.max(...vals);

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
          {labels[period].map((l) => (
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
            {metric === "time" ? "5h 12m" : "8.5"}
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
            {metric === "time" ? "7h 20m" : "10"}
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
            ["☀️", 90],
            ["⛅", 70],
            ["🌧️", 45],
            ["❄️", 50],
          ].map(([icon, h]) => (
            <div
              key={icon}
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
                  opacity: h / 100,
                }}
              />
              <span style={{ fontSize: "12px" }}>{icon}</span>
            </div>
          ))}
        </div>

        <p
          style={{ fontSize: "13px", fontWeight: "500", margin: "16px 0 10px" }}
        >
          Behaviour by friend
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            ["Biscuit", 92],
            ["Mochi", 72],
            ["Solo", 58],
          ].map(([name, pct]) => (
            <div
              key={name}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <span style={{ fontSize: "12px", color: "#666", width: "52px" }}>
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
                {(pct / 20).toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

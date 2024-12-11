import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import firebase from "../../service/firebaseConnection";
import MobileLayout from "@/components/layout/mobileLayout";
import Svg, { Circle } from "react-native-svg";

type ServiceData = {
  total: number;
  count: number;
};

type ServicesSummary = {
  Corte: ServiceData;
  Barba: ServiceData;
  Produtos: ServiceData;
};

const screenWidth = Dimensions.get("window").width;

const Statistics: React.FC = () => {
  const [monthlyEarnings, setMonthlyEarnings] = useState<number>(0);
  const [annualEarnings, setAnnualEarnings] = useState<number>(0); // Ganhos anuais
  const [servicesData, setServicesData] = useState<ServicesSummary>({
    Corte: { total: 0, count: 0 },
    Barba: { total: 0, count: 0 },
    Produtos: { total: 0, count: 0 },
  });
  const [annualServicesData, setAnnualServicesData] = useState<ServicesSummary>(
    {
      Corte: { total: 0, count: 0 },
      Barba: { total: 0, count: 0 },
      Produtos: { total: 0, count: 0 },
    }
  );
  const [monthlyAppointments, setMonthlyAppointments] = useState(0);
  const [monthlyData, setMonthlyData] = useState<number[]>(
    new Array(12).fill(0)
  ); // Para armazenar o faturamento por mês

  const fetchData = async () => {
    try {
      const snapshot = await firebase
        .firestore()
        .collection("schedullings")
        .get();
      let totalEarnings = 0;
      let totalAppointments = 0;
      let totalAnnualEarnings = 0;
      const servicesSummary = {
        Corte: { total: 0, count: 0 },
        Barba: { total: 0, count: 0 },
        Produtos: { total: 0, count: 0 },
      };
      const annualServicesSummary = {
        Corte: { total: 0, count: 0 },
        Barba: { total: 0, count: 0 },
        Produtos: { total: 0, count: 0 },
      };

      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();
      const monthlyTotals = new Array(12).fill(0); // Inicializando os totais mensais

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.day) {
          const [year, month] = data.day.split("-").map(Number);
          const monthIndex = month - 1;

          if (month === currentMonth && year === currentYear) {
            totalEarnings += data.totalPrice || 0;
            totalAppointments += 1;

            if (data.services) {
              data.services.forEach(
                (service: { serviceName: string; price: number }) => {
                  if (service.serviceName === "Corte") {
                    servicesSummary.Corte.total += Number(service.price);
                    servicesSummary.Corte.count += 1;
                  } else if (service.serviceName === "Barba") {
                    servicesSummary.Barba.total += Number(service.price);
                    servicesSummary.Barba.count += 1;
                  }
                }
              );
            }

            if (data.products) {
              data.products.forEach((product: { totalPrice: number }) => {
                servicesSummary.Produtos.total += Number(product.totalPrice);
                servicesSummary.Produtos.count += 1;
              });
            }
          }

          if (year === currentYear) {
            // Faturamento anual
            totalAnnualEarnings += data.totalPrice || 0;
            monthlyTotals[monthIndex] += data.totalPrice || 0; // Atualizando o faturamento do mês

            // Contagem e faturamento dos serviços
            if (data.services) {
              data.services.forEach(
                (service: { serviceName: string; price: number }) => {
                  if (service.serviceName === "Corte") {
                    annualServicesSummary.Corte.total += Number(service.price);
                    annualServicesSummary.Corte.count += 1;
                  } else if (service.serviceName === "Barba") {
                    annualServicesSummary.Barba.total += Number(service.price);
                    annualServicesSummary.Barba.count += 1;
                  }
                }
              );
            }

            if (data.products) {
              data.products.forEach((product: { totalPrice: number }) => {
                annualServicesSummary.Produtos.total += Number(
                  product.totalPrice
                );
                annualServicesSummary.Produtos.count += 1;
              });
            }
          }
        }
      });

      setMonthlyData(monthlyTotals);
      setMonthlyEarnings(totalEarnings);
      setMonthlyAppointments(totalAppointments);
      setServicesData(servicesSummary);
      setAnnualEarnings(totalAnnualEarnings);
      setAnnualServicesData(annualServicesSummary);
    } catch (error) {
      console.error("Erro ao buscar dados: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  

  const renderService = (name: string, data: ServiceData) => {
    const percentage = ((data.total / monthlyEarnings) * 100).toFixed(2);
    const radius = 40; // Raio do círculo
    const strokeWidth = 8; // Largura da borda do círculo
    const circumference = 2 * Math.PI * radius; // Circunferência do círculo
    const progress = (Number(percentage) / 100) * circumference; // Progresso preenchido
  
    return (
      <View style={styles.card}>
        {/* Círculo com porcentagem */}
        <View style={styles.circleContainer}>
          <Svg width={100} height={100} viewBox="0 0 100 100">
            {/* Círculo de fundo */}
            <Circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#121212"
              strokeWidth={strokeWidth}
              fill="none"
            />
            {/* Círculo preenchido */}
            <Circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#EBA832"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference}`}
              strokeDashoffset={`${circumference - progress}`}
              fill="none"
              strokeLinecap="round"
              rotation="-90"
              origin="50, 50"
            />
          </Svg>
          {/* Porcentagem dentro do círculo */}
          <View style={styles.percentageContainer}>
            <Text style={styles.percentageText}>{percentage}%</Text>
          </View>
        </View>
        {/* Dados do Serviço */}
        <View style={styles.dataContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.countText}>Quantidade: {data.count}</Text>
          <Text style={styles.totalText}>Total: R${data.total.toFixed(2)}</Text>
        </View>
      </View>
    );
  };

  

  const renderAnnualService = (
    name: string,
    data: ServiceData,
  ) => {
    const percentage = ((data.total / annualEarnings) * 100).toFixed(2);
    const radius = 40; // Raio do círculo
    const strokeWidth = 8; // Largura da borda do círculo
    const circumference = 2 * Math.PI * radius; // Circunferência do círculo
    const progress = (Number(percentage) / 100) * circumference; // Progresso preenchido
  
    return (
      <View style={styles.cardAno}>
        {/* Círculo com porcentagem */}
        <View style={styles.circleContainer}>
          <Svg width={100} height={100} viewBox="0 0 100 100">
            {/* Círculo de fundo */}
            <Circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#121212"
              strokeWidth={strokeWidth}
              fill="none"
            />
            {/* Círculo preenchido */}
            <Circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#EBA832"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference}`}
              strokeDashoffset={`${circumference - progress}`}
              fill="none"
              strokeLinecap="round"
              rotation="-90"
              origin="50, 50"
            />
          </Svg>
          {/* Porcentagem dentro do círculo */}
          <View style={styles.percentageContainer}>
            <Text style={styles.percentageText}>{percentage}%</Text>
          </View>
        </View>
        {/* Dados do Serviço */}
        <View style={styles.dataContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.totalText}>R${data.total.toFixed(2)}</Text>
          <Text style={styles.countText}>Quantidade: {data.count}</Text>
        </View>
      </View>
    );
  };
  
  // Filtrando os dados mensais para remover meses com valor zero
  const filteredMonthlyData: number[] = monthlyData.filter((value) => value > 0);
  const filteredLabels: string[] = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].filter(
    (_, index) => monthlyData[index] > 0
  );

  const annualChartData = {
    labels: filteredLabels, // Usando as etiquetas filtradas
    datasets: [
      {
        data: filteredMonthlyData, // Usando os dados mensais filtrados
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "transparent", // Cor inicial do gradiente de fundo
    backgroundGradientFromOpacity: 0, // Opacidade inicial do gradiente de fundo
    backgroundGradientTo: "transparent", // Cor final do gradiente de fundo
    backgroundGradientToOpacity: 0, // Opacidade final do gradiente de fundo
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    barPercentage: 0.5, // Ajusta a largura das colunas
    fillShadowGradient: "#EBA832", // Cor das barras (preenchimento)
    fillShadowGradientOpacity: 1, // Opacidade da cor
    withInnerLines: false, // Remove as linhas internas
    withHorizontalLines: false, // Remove as linhas horizontais
    showYAxisLabel: false, // Remove
  };
  
  
  return (
    <MobileLayout>
      {/* Seção Mês Atual */}
      <View style={styles.monthSection}>
        <Text style={styles.header}>GANHOS MÊS ATUAL</Text>
        <Text style={styles.earnings}>R${monthlyEarnings.toFixed(2)}</Text>

        <View style={styles.separator} />

        <Text style={styles.subHeader}>DISTRIBUIÇÃO MÊS ATUAL</Text>
        {renderService("Corte", servicesData.Corte)}
        {renderService("Barba", servicesData.Barba)}
       {/* {renderService("Produtos", servicesData.Produtos)}*/}
      </View>
      <View style={styles.separator} />

      {/* Seção Ano Atual */}
      <Text style={styles.header}>GANHOS NO ANO</Text>
      <Text style={styles.earnings}>R${annualEarnings.toFixed(2)}</Text>
      <View style={styles.yearSection}>
        <Text style={styles.subHeader}>DISTRIBUIÇÃO ANUAL</Text>

        <BarChart
          data={annualChartData}
          width={screenWidth - 20} // Ajuste de largura para o gráfico caber bem na tela
          height={220}
          chartConfig={chartConfig}
          fromZero={true} // Faz as barras iniciarem do eixo zero
          showBarTops={false} // Oculta os valores no topo das barras
          yAxisLabel="" // Remove o prefixo para os valores do eixo Y
          yAxisSuffix="" // Remove o sufixo para os valores do eixo Y
          withHorizontalLabels={false} // Remove os valores no eixo Y
          style={{ marginLeft: 0 }} // Remove a margem esquerda
        />

        <View style={styles.yearSectionDesc}>
          {renderAnnualService("Corte", annualServicesData.Corte)}
          {renderAnnualService("Barba", annualServicesData.Barba)}
        </View>
      </View>
    </MobileLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  monthSection: {
    marginBottom: 30,
  },
  yearSection: {
    marginTop: 30,
  },
  header: {
    fontFamily: "CircularSpotifyText-Book",
    fontSize: 15,
    color: "white",
  },
  earnings: {
    fontSize: 40,
    color: "#f8f8f8",
  },
  subHeader: {
    fontSize: 14,
    color: "white",
    marginBottom: 10,
  },
  serviceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  serviceColum: {
    flexDirection: "column",
  },
  serviceText: {
    fontSize: 16,
    color: "white",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#f8f8f86e",
    marginVertical: 20,
    marginBottom: 40,
  },
  yearSectionDesc: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  cardAno: {
    flexDirection:'column',
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  circleContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  percentageContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  percentageText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  dataContainer: {
    marginLeft: 15,
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  countText: {
    fontSize: 14,
    color: "#B3B3B3",
    marginTop: 5,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 5,
  },

});

export default Statistics;
